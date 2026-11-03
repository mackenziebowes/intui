//! Where each child of a row sits when the row names widths: a pure function of the row's width, the
//! widths, the floors and the gap. A row that names no widths takes equal parts, not this function.

use intui_types::forms::Width;

/// One child's place in a row, in px from the row's left edge.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Slot {
    pub x: i32,
    pub w: i32,
}

/// The slots for `widths` in a row `total` px wide, with `gap` px between children.
///
/// 1. Fixed children take their px. Every `rest` child shares what is left equally.
/// 2. If a `rest` child would fall below its floor, it holds its floor and the fixed children
///    shrink in proportion to their px, none below its own floor.
/// 3. If the floors alone are wider than the row, everything shrinks in proportion to its floor.
/// 4. A row with no `rest` child leaves any remainder empty at the right.
pub fn row_slots(total: i32, gap: i32, widths: &[Width], floors: &[u16]) -> Vec<Slot> {
    let n = widths.len() as i32;
    let avail = (total - gap * (n - 1).max(0)).max(0) as f64;
    let floor = |i: usize| floors.get(i).copied().unwrap_or(0) as f64;
    let fixed: Vec<usize> = (0..widths.len()).filter(|&i| matches!(widths[i], Width::Px(_))).collect();
    let rest: Vec<usize> = (0..widths.len()).filter(|&i| widths[i] == Width::Rest).collect();
    let px = |i: usize| match widths[i] {
        Width::Px(p) => p as f64,
        Width::Rest => 0.0,
    };
    let mut size = vec![0.0_f64; widths.len()];

    let fixed_sum: f64 = fixed.iter().map(|&i| px(i)).sum();
    let share = if rest.is_empty() { 0.0 } else { (avail - fixed_sum) / rest.len() as f64 };
    let rest_floor_ok = rest.iter().all(|&i| share >= floor(i));
    if avail >= fixed_sum && rest_floor_ok {
        for &i in &fixed {
            size[i] = px(i);
        }
        for &i in &rest {
            size[i] = share;
        }
    } else {
        let rest_floors: f64 = rest.iter().map(|&i| floor(i)).sum();
        let fixed_floors: f64 = fixed.iter().map(|&i| floor(i)).sum();
        if avail >= rest_floors + fixed_floors {
            for &i in &rest {
                size[i] = floor(i);
            }
            shrink(&fixed, &mut size, avail - rest_floors, &px, &floor);
        } else {
            let all_floors = rest_floors + fixed_floors;
            for i in 0..widths.len() {
                size[i] = if all_floors > 0.0 { avail * floor(i) / all_floors } else { 0.0 };
            }
        }
    }

    let mut x = 0;
    size.iter()
        .map(|&s| {
            let w = s.floor() as i32;
            let slot = Slot { x, w };
            x += w + gap;
            slot
        })
        .collect()
}

/// Fit `children` into `budget` px by scaling their px down in proportion, holding any that reaches its floor there.
fn shrink(children: &[usize], size: &mut [f64], budget: f64, px: &dyn Fn(usize) -> f64, floor: &dyn Fn(usize) -> f64) {
    let mut held: Vec<usize> = Vec::new();
    loop {
        let held_sum: f64 = held.iter().map(|&i| floor(i)).sum();
        let free: Vec<usize> = children.iter().copied().filter(|i| !held.contains(i)).collect();
        let free_px: f64 = free.iter().map(|&i| px(i)).sum();
        let scale = if free_px > 0.0 { ((budget - held_sum) / free_px).min(1.0) } else { 1.0 };
        match free.iter().copied().find(|&i| px(i) * scale < floor(i)) {
            Some(i) => held.push(i),
            None => {
                for &i in &held {
                    size[i] = floor(i);
                }
                for &i in &free {
                    size[i] = px(i) * scale;
                }
                return;
            }
        }
    }
}
