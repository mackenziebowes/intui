//! Flow lines: a line through its corners with each inner corner rounded, as points along it.

use egui::Pos2;

const CORNER: f32 = 6.0;

/// A line through `corners` with each inner corner rounded, as points along it.
pub(super) fn rounded(corners: &[Pos2]) -> Vec<Pos2> {
    let mut out = vec![corners[0]];
    for window in corners.windows(3) {
        let (a, b, c) = (window[0], window[1], window[2]);
        let radius = CORNER.min((b - a).length() / 2.0).min((c - b).length() / 2.0);
        let toward = |p: Pos2| b + (p - b).normalized() * radius;
        let (p, q) = (toward(a), toward(c));
        out.push(p);
        for step in 1..6 {
            let t = step as f32 / 6.0;
            out.push(Pos2::new((1.0 - t) * (1.0 - t) * p.x + 2.0 * (1.0 - t) * t * b.x + t * t * q.x, (1.0 - t) * (1.0 - t) * p.y + 2.0 * (1.0 - t) * t * b.y + t * t * q.y));
        }
        out.push(q);
    }
    out.push(corners[corners.len() - 1]);
    out
}
