//! `intui-harness`: a bare app that shows IntUI trees from a file or a directory, so the checks have a real window to drive.
//!
//! It takes an optional style file (JSON, the same token names as the web renderer's `--intui-*`), prints every event as one
//! JSON line on stdout, and can refuse a press so the Refused path can be driven. Build it with `--features inspection` and
//! start it with `EGUI_INSPECTION=127.0.0.1:PORT` to let the checks read its accessibility tree and take screenshots.

mod app;
mod cli;
mod error;
mod tokens;
mod trees;

use cli::{Renderer, Visuals};
use eframe::egui;
use error::HarnessError;
use std::process::ExitCode;
use tokens::FileStyle;

fn run() -> Result<(), HarnessError> {
    let arguments = cli::read(std::env::args().skip(1))?;
    let loaded = trees::load(&arguments.path)?;
    let style = match &arguments.style {
        Some(path) => FileStyle::read(path)?,
        None => FileStyle::none(),
    };
    let renderer = match arguments.renderer {
        #[cfg(feature = "wgpu")]
        Renderer::Wgpu => eframe::Renderer::Wgpu,
        #[cfg(feature = "glow")]
        Renderer::Glow => eframe::Renderer::Glow,
        #[cfg(not(feature = "wgpu"))]
        Renderer::Wgpu => return Err(HarnessError::RendererNotBuilt { renderer: "wgpu" }),
        #[cfg(not(feature = "glow"))]
        Renderer::Glow => return Err(HarnessError::RendererNotBuilt { renderer: "glow" }),
    };
    let visuals = match arguments.visuals {
        Visuals::Dark => egui::Visuals::dark(),
        Visuals::Light => egui::Visuals::light(),
    };
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default().with_inner_size([900.0, 700.0]).with_app_id("intui-harness").with_title("intui-harness"),
        renderer,
        ..Default::default()
    };
    let harness = app::Harness::new(&arguments, loaded, style);
    eframe::run_native(
        "intui-harness",
        options,
        Box::new(move |creation| {
            creation.egui_ctx.set_visuals(visuals);
            Ok(Box::new(harness))
        }),
    )
    .map_err(|why| HarnessError::WindowFailed { why: why.to_string() })
}

fn main() -> ExitCode {
    match run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(error) => {
            eprintln!("{error}");
            ExitCode::from(2)
        }
    }
}
