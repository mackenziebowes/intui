//! Numbers written the way JavaScript writes them.
//!
//! Core formats with `Number#toFixed`, `Number#toPrecision`, `String(number)` and
//! `Intl.NumberFormat("en")`, and each rounds a little differently (`toFixed` on the
//! exact binary value, `Intl` on the shortest decimal), so a Rust `format!` would
//! disagree on cases like 1.005. Each function here names the JavaScript it copies.

/// `String(value)`.
pub fn js_to_string(value: f64) -> String {
    if value == 0.0 {
        return "0".to_string();
    }
    let sign = if value < 0.0 { "-" } else { "" };
    let scientific = format!("{:e}", value.abs());
    let (mantissa, exponent) = scientific.split_once('e').expect("{:e} always has an exponent");
    let digits: String = mantissa.chars().filter(|c| *c != '.').collect();
    let exponent: i32 = exponent.parse().expect("{:e} exponent is an integer");
    let k = digits.len() as i32;
    let n = exponent + 1;
    let body = if k <= n && n <= 21 {
        format!("{digits}{}", "0".repeat((n - k) as usize))
    } else if 0 < n && n <= 21 {
        format!("{}.{}", &digits[..n as usize], &digits[n as usize..])
    } else if -6 < n && n <= 0 {
        format!("0.{}{digits}", "0".repeat((-n) as usize))
    } else {
        let e = n - 1;
        let sign_e = if e < 0 { '-' } else { '+' };
        if k == 1 {
            format!("{digits}e{sign_e}{}", e.abs())
        } else {
            format!("{}.{}e{sign_e}{}", &digits[..1], &digits[1..], e.abs())
        }
    };
    format!("{sign}{body}")
}

/// Adds one to a string of decimal digits.
fn increment(digits: &str) -> String {
    let mut out: Vec<u8> = digits.bytes().collect();
    for byte in out.iter_mut().rev() {
        if *byte == b'9' {
            *byte = b'0';
        } else {
            *byte += 1;
            return String::from_utf8(out).expect("digits are ASCII");
        }
    }
    format!("1{}", String::from_utf8(out).expect("digits are ASCII"))
}

/// `value.toFixed(digits)`: rounds the exact binary value, halves going up.
pub fn js_to_fixed(value: f64, digits: usize) -> String {
    if value.abs() >= 1e21 {
        return js_to_string(value);
    }
    let sign = if value < 0.0 { "-" } else { "" };
    let exact = format!("{:.80}", value.abs());
    let (whole, fraction) = exact.split_once('.').expect("a precision always prints a point");
    let mut kept = format!("{whole}{}", &fraction[..digits]);
    if fraction.as_bytes()[digits] >= b'5' {
        kept = increment(&kept);
    }
    let split = kept.len() - digits;
    let body = if digits == 0 { kept } else { format!("{}.{}", &kept[..split], &kept[split..]) };
    format!("{sign}{body}")
}

/// `Number(value.toPrecision(digits))`.
pub fn js_round_significant(value: f64, digits: usize) -> f64 {
    if value == 0.0 {
        return 0.0;
    }
    let sign = if value < 0.0 { -1.0 } else { 1.0 };
    let scientific = format!("{:.80e}", value.abs());
    let (mantissa, exponent) = scientific.split_once('e').expect("{:e} always has an exponent");
    let all: String = mantissa.chars().filter(|c| *c != '.').collect();
    let mut exponent: i32 = exponent.parse().expect("{:e} exponent is an integer");
    let mut kept = all[..digits].to_string();
    if all.as_bytes()[digits] >= b'5' {
        kept = increment(&kept);
        if kept.len() > digits {
            kept.truncate(digits);
            exponent += 1;
        }
    }
    let text = format!("{}.{}e{exponent}", &kept[..1], &kept[1..]);
    sign * text.parse::<f64>().expect("a decimal built from digits parses")
}

/// `Number(value.toFixed(2)) + 0`: a number as a reader sees it, with `-0` made `0`.
pub fn shown_number(value: f64) -> f64 {
    let shown: f64 = js_to_fixed(value, 2).parse().expect("toFixed writes a number");
    if shown == 0.0 {
        0.0
    } else {
        shown
    }
}

/// `new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(value)`: the
/// shortest decimal of the number, rounded half away from zero, grouped by threes.
/// A negative that rounds to zero keeps its sign, as `Intl` does.
pub fn intl_number(value: f64) -> String {
    let shortest = format!("{}", value.abs());
    let (whole, fraction) = shortest.split_once('.').unwrap_or((&shortest, ""));
    let mut fraction = fraction.to_string();
    let mut whole = whole.to_string();
    if fraction.len() > 2 {
        let round_up = fraction.as_bytes()[2] >= b'5';
        fraction.truncate(2);
        if round_up {
            let bumped = increment(&format!("{whole}{fraction}"));
            let split = bumped.len() - 2;
            whole = bumped[..split].to_string();
            fraction = bumped[split..].to_string();
        }
    }
    let fraction = fraction.trim_end_matches('0');
    let mut grouped = String::new();
    for (index, digit) in whole.chars().enumerate() {
        if index > 0 && (whole.len() - index) % 3 == 0 {
            grouped.push(',');
        }
        grouped.push(digit);
    }
    let sign = if value.is_sign_negative() { "-" } else { "" };
    if fraction.is_empty() {
        format!("{sign}{grouped}")
    } else {
        format!("{sign}{grouped}.{fraction}")
    }
}

/// core's `formatNumber(value, unit)`.
pub fn format_number(value: f64, unit: Option<&str>) -> String {
    let formatted = intl_number(value);
    match unit {
        None | Some("") => formatted,
        // A currency symbol leads, after any minus sign: "$1,284.5", "-$5".
        Some(unit @ ("$" | "€" | "£" | "¥")) => match formatted.strip_prefix('-') {
            Some(rest) => format!("-{unit}{rest}"),
            None => format!("{unit}{formatted}"),
        },
        Some("%") => format!("{formatted}%"),
        Some(unit) => format!("{formatted} {unit}"),
    }
}
