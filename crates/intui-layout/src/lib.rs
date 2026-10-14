//! The data math every IntUI renderer shares, ported from `packages/layout`: chart
//! scales, how a Flow is layered, how typed numbers are read, and the marks a
//! reading wears.
//!
//! The promise is the same answers as the TypeScript on the same input, including
//! JavaScript's own rounding, so a Rust window and a web page draw one chart.

mod chart_scale;
mod flow_analysis;
mod logic;

pub use chart_scale::{
    build_model, format_value, marker_glyph, nice_domain, nice_step, place_labels, project, with_unit, Category, ChartModel, Domain,
    Marker, ModelSeries, PlacedLabel,
};
pub use flow_analysis::{analyse, break_cycles, resolve_edges, Analysis, Edge};
pub use logic::{align_of, change_shape, chart_label, parse_number, reading_mark, Align, ChangeShape, NumberInput, Way};
