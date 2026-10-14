//! A window the checks can open without touching Mackenzie's screen: a virtual Hyprland output made for the test,
//! the harness launched silently onto it, and the output kept painting so the window keeps handling input.
//!
//! Everything is undone on drop, even when a check fails: the harness is killed, the painting stops and the output is removed.

use std::net::TcpListener;
use std::os::unix::fs::PermissionsExt;
use std::path::PathBuf;
use std::process::{Command, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex, MutexGuard};
use std::thread::JoinHandle;
use std::time::{Duration, Instant};

/// Only one headless window exists at a time: they share the GPU, and a runaway one is easier to see alone.
static ONE_AT_A_TIME: Mutex<()> = Mutex::new(());

/// The most memory a harness may hold before the check kills it, in kibibytes.
const MEMORY_CAP_KIB: u64 = 3 * 1024 * 1024;

const OUTPUT_PREFIX: &str = "intui-test-";

pub struct Window {
    /// What the harness printed on stdout, one line per event.
    pub stdout: PathBuf,
    output: String,
    harness_pid: u32,
    painting: Arc<AtomicBool>,
    helpers: Vec<JoinHandle<()>>,
    pub address: String,
    _alone: MutexGuard<'static, ()>,
}

fn hyprctl(args: &[&str]) -> String {
    let output = Command::new("hyprctl")
        .args(args)
        .output()
        .unwrap_or_else(|error| panic!("couldn't run hyprctl ({error}); the end-to-end checks need Hyprland to make a headless output"));
    let said = String::from_utf8_lossy(&output.stdout).trim().to_string();
    assert!(output.status.success() && !said.contains("error"), "`hyprctl {}` failed: {said} {}", args.join(" "), String::from_utf8_lossy(&output.stderr));
    said
}

fn process_is_running(pid: u32) -> bool {
    PathBuf::from(format!("/proc/{pid}")).exists()
}

/// Removes outputs earlier runs left behind when they were killed before they could clean up.
fn remove_abandoned_outputs() {
    let monitors = hyprctl(&["monitors", "-j"]);
    let monitors: serde_json::Value = serde_json::from_str(&monitors).expect("hyprctl prints JSON");
    for monitor in monitors.as_array().expect("a list of monitors") {
        let name = monitor["name"].as_str().unwrap_or_default();
        let Some(owner) = name.strip_prefix(OUTPUT_PREFIX).and_then(|rest| rest.parse::<u32>().ok()) else { continue };
        if !process_is_running(owner) {
            hyprctl(&["output", "remove", name]);
        }
    }
}

fn free_port() -> u16 {
    TcpListener::bind("127.0.0.1:0").expect("a free port").local_addr().expect("a bound address").port()
}

fn workspace_of(output: &str) -> i64 {
    let monitors: serde_json::Value = serde_json::from_str(&hyprctl(&["monitors", "-j"])).expect("hyprctl prints JSON");
    monitors
        .as_array()
        .expect("a list of monitors")
        .iter()
        .find(|monitor| monitor["name"] == output)
        .and_then(|monitor| monitor["activeWorkspace"]["id"].as_i64())
        .unwrap_or_else(|| panic!("the headless output {output} has no workspace"))
}

impl Window {
    /// The lines the harness has printed on stdout so far.
    pub fn printed(&self) -> Vec<String> {
        std::fs::read_to_string(&self.stdout).unwrap_or_default().lines().map(str::to_string).collect()
    }

    /// Waits until the harness has printed `count` lines, and returns them all.
    pub fn wait_for_lines(&self, count: usize) -> Vec<String> {
        let started = Instant::now();
        loop {
            let lines = self.printed();
            if lines.len() >= count {
                return lines;
            }
            assert!(started.elapsed() < Duration::from_secs(15), "waited 15 seconds for {count} printed line(s); the harness printed {lines:?}");
            std::thread::sleep(Duration::from_millis(50));
        }
    }

    /// Opens `binary` with `arguments` on a fresh headless output, with its inspection port on. `binary` must be built with `--features inspection`.
    /// `name` tells this window's files apart and holds no spaces or quotes.
    pub fn open(name: &str, binary: &str, arguments: &[&str]) -> Window {
        let alone = ONE_AT_A_TIME.lock().unwrap_or_else(|poisoned| poisoned.into_inner());
        remove_abandoned_outputs();
        let output = format!("{OUTPUT_PREFIX}{}", std::process::id());
        hyprctl(&["output", "create", "headless", &output]);
        let painting = Arc::new(AtomicBool::new(true));
        let scratch = PathBuf::from(env!("CARGO_TARGET_TMPDIR"));
        let stdout = scratch.join(format!("{name}.stdout"));
        let stderr = scratch.join(format!("{name}.stderr"));
        let _ = std::fs::remove_file(&stdout);
        let mut window = Window {
            stdout: stdout.clone(),
            output: output.clone(),
            harness_pid: 0,
            painting: painting.clone(),
            helpers: Vec::new(),
            address: String::new(),
            _alone: alone,
        };
        let port = free_port();
        let address = format!("127.0.0.1:{port}");
        let workspace = workspace_of(&output);
        let script = scratch.join(format!("{name}.sh"));
        let quoted: Vec<String> = arguments.iter().map(|argument| format!("'{}'", argument.replace('\'', "'\\''"))).collect();
        std::fs::write(&script, format!("#!/bin/sh\nEGUI_INSPECTION={address} exec '{binary}' {} > '{}' 2> '{}'\n", quoted.join(" "), stdout.display(), stderr.display()))
            .expect("the launch script can be written");
        std::fs::set_permissions(&script, std::fs::Permissions::from_mode(0o755)).expect("the launch script can be made runnable");
        let launch = format!("hl.dsp.exec_cmd(\"[workspace {workspace} silent; float; size 900 700] {}\")", script.display());
        hyprctl(&["dispatch", &launch]);
        window.address = address;
        window.helpers.push(keep_painting(&output, painting.clone()));
        window.harness_pid = wait_for_harness(&window.output, binary);
        window.helpers.push(watch_memory(window.harness_pid, painting));
        window
    }
}

/// `grim` reading the output makes Hyprland give its windows frame callbacks, which egui needs before it will handle input.
fn keep_painting(output: &str, painting: Arc<AtomicBool>) -> JoinHandle<()> {
    let output = output.to_string();
    std::thread::spawn(move || {
        while painting.load(Ordering::SeqCst) {
            let _ = Command::new("grim").args(["-o", &output, "-t", "ppm", "-"]).stdout(Stdio::null()).stderr(Stdio::null()).status();
            std::thread::sleep(Duration::from_millis(50));
        }
    })
}

fn watch_memory(pid: u32, painting: Arc<AtomicBool>) -> JoinHandle<()> {
    std::thread::spawn(move || {
        while painting.load(Ordering::SeqCst) {
            let status = std::fs::read_to_string(format!("/proc/{pid}/status")).unwrap_or_default();
            let resident = status
                .lines()
                .find_map(|line| line.strip_prefix("VmRSS:"))
                .and_then(|rest| rest.trim().trim_end_matches("kB").trim().parse::<u64>().ok());
            if resident.is_some_and(|kib| kib > MEMORY_CAP_KIB) {
                eprintln!("the harness (pid {pid}) passed {} MiB; killing it", MEMORY_CAP_KIB / 1024);
                let _ = Command::new("kill").args(["-9", &pid.to_string()]).status();
            }
            std::thread::sleep(Duration::from_millis(500));
        }
    })
}

/// The launched process is a child of Hyprland, not of the test, so it's found by its window.
fn wait_for_harness(output: &str, binary: &str) -> u32 {
    let started = Instant::now();
    let workspace = workspace_of(output);
    loop {
        let clients: serde_json::Value = serde_json::from_str(&hyprctl(&["clients", "-j"])).expect("hyprctl prints JSON");
        let found = clients.as_array().expect("a list of windows").iter().find(|client| client["workspace"]["id"].as_i64() == Some(workspace));
        if let Some(pid) = found.and_then(|client| client["pid"].as_u64()) {
            return u32::try_from(pid).expect("a process id fits in 32 bits");
        }
        assert!(started.elapsed() < Duration::from_secs(30), "{binary} never opened a window on {output} within 30 seconds");
        std::thread::sleep(Duration::from_millis(100));
    }
}

impl Drop for Window {
    fn drop(&mut self) {
        self.painting.store(false, Ordering::SeqCst);
        if self.harness_pid != 0 {
            let _ = Command::new("kill").args(["-9", &self.harness_pid.to_string()]).status();
        }
        for helper in self.helpers.drain(..) {
            let _ = helper.join();
        }
        let _ = Command::new("hyprctl").args(["output", "remove", &self.output]).stdout(Stdio::null()).status();
    }
}
