//! The data math every IntUI renderer shares, ported from `packages/layout`: chart
//! scales, how a Flow is layered, how typed numbers are read, and the marks a
//! reading wears.
//!
//! The promise is the same answers as the TypeScript on the same input, including
//! JavaScript's own rounding, so a Rust window and a web page draw one chart.

mod chart_scale;
mod flow_analysis;
mod flow_back;
mod flow_geometry;
mod flow_labels;
mod logic;
mod row;
mod words;

pub use row::{row_slots, Slot};
pub use chart_scale::{
    build_model, format_value, marker_glyph, nice_domain, nice_step, place_labels, project, with_unit, Category, ChartModel, Domain,
    Marker, MarkerSite, ModelSeries, PlacedLabel, Scale,
};
pub use flow_analysis::{analyse, resolve_edges, Analysis, Edge, LayerIndex};
pub use flow_back::{plan_back, wrap_label, BackPlan, BackRoom, BackSlot, Order, Route};
pub use flow_geometry::{
    back_geometry, connector, side_extent, Anchor, BackGeometry, Connector, PlacedBackLabel, PlacedRoute, Point, Rect,
    BACK_LABEL_W, LABEL_GAP, LABEL_LINE_H, LABEL_STACK_GAP, LANE_PITCH,
};
pub use flow_labels::{place_flow_labels, LabelRequest, PlacedFlowLabel};
pub use logic::{align_of, change_shape, chart_label, parse_number, reading_mark, Align, ChangeShape, NumberInput, Pointing, Way};
