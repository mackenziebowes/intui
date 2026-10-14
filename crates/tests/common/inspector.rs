//! A client for egui's inspection port: reads the accessibility tree of a running window, clicks and types
//! into it by node, and takes screenshots. It is the only way the checks touch the window.

use egui::accesskit::{Action, ActionRequest, Node, NodeId, Role, TreeId};
use egui::Event;
use egui_inspection::protocol::read_handshake;
use egui_inspection::{read_message, write_message, EncodedPng, Request, Response};
use std::net::TcpStream;
use std::time::{Duration, Instant};

pub struct Inspector {
    stream: TcpStream,
}

/// The accessibility tree as one frame drew it.
pub struct Snapshot {
    nodes: Vec<(NodeId, Node)>,
}

impl Inspector {
    /// Connects to a window's inspection port, retrying until `wait` has passed.
    pub fn connect(address: &str, wait: Duration) -> Inspector {
        let started = Instant::now();
        loop {
            match TcpStream::connect(address) {
                Ok(stream) => {
                    stream.set_read_timeout(Some(Duration::from_secs(30))).expect("a socket takes a timeout");
                    let mut inspector = Inspector { stream };
                    read_handshake(&mut inspector.stream).unwrap_or_else(|error| panic!("{address} isn't an egui inspection port: {error}"));
                    return inspector;
                }
                Err(error) if started.elapsed() > wait => {
                    panic!("the harness never opened its inspection port {address} within {wait:?} ({error}); is it built with `--features inspection`?")
                }
                Err(_) => std::thread::sleep(Duration::from_millis(100)),
            }
        }
    }

    fn ask(&mut self, request: Request) -> Response {
        write_message(&self.stream, &request).expect("the inspection port takes a request");
        match read_message::<_, Response>(&self.stream) {
            Ok(Response::Error { message }) => panic!("the window refused an inspection request: {message}"),
            Ok(response) => response,
            Err(error) => panic!("the window didn't answer an inspection request in 30 seconds ({error}); it may have stopped painting"),
        }
    }

    pub fn snapshot(&mut self) -> Snapshot {
        match self.ask(Request::GetTree) {
            Response::Tree { accesskit: Some(update), .. } => Snapshot { nodes: update.nodes },
            Response::Tree { accesskit: None, .. } => panic!("the window has no accessibility tree yet"),
            other => panic!("asked for the tree, got {other:?}"),
        }
    }

    /// Takes snapshots until `done` is satisfied by one of them, or panics saying what was missing.
    pub fn wait_for(&mut self, what: &str, done: impl Fn(&Snapshot) -> bool) -> Snapshot {
        let started = Instant::now();
        loop {
            let snapshot = self.snapshot();
            if done(&snapshot) {
                return snapshot;
            }
            assert!(
                started.elapsed() < Duration::from_secs(15),
                "waited 15 seconds for {what}, and the window never showed it. What it showed:\n{}",
                snapshot.dump()
            );
            std::thread::sleep(Duration::from_millis(100));
        }
    }

    pub fn press(&mut self, node: NodeId) {
        let request = ActionRequest { action: Action::Click, target_tree: TreeId::ROOT, target_node: node, data: None };
        self.apply(vec![Event::AccessKitActionRequest(request)]);
    }

    /// Gives a node the keyboard focus, then types `text` into it.
    pub fn type_into(&mut self, node: NodeId, text: &str) {
        let focus = ActionRequest { action: Action::Focus, target_tree: TreeId::ROOT, target_node: node, data: None };
        self.apply(vec![Event::AccessKitActionRequest(focus)]);
        self.apply(vec![Event::Text(text.to_string())]);
    }

    fn apply(&mut self, events: Vec<Event>) {
        match self.ask(Request::ApplyEvents { events }) {
            Response::Done => {}
            other => panic!("applied events, got {other:?}"),
        }
        self.settle();
    }

    pub fn settle(&mut self) {
        match self.ask(Request::Settle { max_steps: 50 }) {
            Response::Settled { .. } => {}
            other => panic!("asked the window to settle, got {other:?}"),
        }
    }

    pub fn screenshot(&mut self) -> EncodedPng {
        match self.ask(Request::GetScreenshot { pixels_per_point: Some(1.0) }) {
            Response::Screenshot(png) => png,
            other => panic!("asked for a screenshot, got {other:?}"),
        }
    }
}

impl Snapshot {
    /// Every node, with its role and the words it carries (a label, or a value for text).
    pub fn dump(&self) -> String {
        self.nodes.iter().map(|(_, node)| format!("  {:?} {:?}", node.role(), words_of(node))).collect::<Vec<_>>().join("\n")
    }

    /// The first node of a role whose words contain `needle`.
    pub fn find(&self, role: Role, needle: &str) -> Option<NodeId> {
        self.nodes.iter().find(|(_, node)| node.role() == role && words_of(node).contains(needle)).map(|(id, _)| *id)
    }

    /// Whether some node says exactly these words, as its label or its value.
    pub fn says(&self, words: &str) -> bool {
        self.nodes.iter().any(|(_, node)| node.label() == Some(words) || node.value() == Some(words))
    }

    /// The text field whose placeholder is `placeholder`.
    pub fn input(&self, placeholder: &str) -> NodeId {
        self.nodes
            .iter()
            .find(|(_, node)| node.role() == Role::TextInput && node.placeholder() == Some(placeholder))
            .map(|(id, _)| *id)
            .unwrap_or_else(|| panic!("no text field \"{placeholder}\" in what the window showed:\n{}", self.dump()))
    }

    /// Where a node sits, in logical points from the window's top left: (left, top, right, bottom).
    pub fn bounds(&self, id: NodeId) -> (f64, f64, f64, f64) {
        let rect = self.nodes.iter().find(|(node_id, _)| *node_id == id).and_then(|(_, node)| node.bounds()).expect("the node has bounds");
        (rect.x0, rect.y0, rect.x1, rect.y1)
    }

    pub fn button(&self, label: &str) -> NodeId {
        self.find(Role::Button, label).unwrap_or_else(|| panic!("no button \"{label}\" in what the window showed:\n{}", self.dump()))
    }

    pub fn is_disabled(&self, id: NodeId) -> bool {
        self.nodes.iter().find(|(node_id, _)| *node_id == id).is_some_and(|(_, node)| node.is_disabled())
    }
}

fn words_of(node: &Node) -> String {
    let label = node.label().unwrap_or_default();
    let value = node.value().unwrap_or_default();
    match (label.is_empty(), value.is_empty()) {
        (false, false) => format!("{label} {value}"),
        (false, true) => label.to_string(),
        (true, _) => value.to_string(),
    }
}
