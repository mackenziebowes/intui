//! JSON text as the edge reads it.
//!
//! One strict parser, so the edge sees exactly what JavaScript's `JSON.parse` lets core
//! see: numbers are rounded to the nearest double however many digits they have, a
//! number too large for a double is kept as infinity (so a reading can be refused for it
//! in core's words), a lone surrogate escape is kept as U+FFFD (a Rust string cannot
//! hold one), and nesting is limited by a number this module names, never by the stack.

use std::collections::HashMap;

/// How many arrays and objects may sit inside each other. A Group costs two, so this is about 4000 Groups deep:
/// at least as deep as core reads (3500).
pub const MAX_DEPTH: usize = 8000;

#[derive(Clone, Debug, PartialEq)]
pub enum Json {
    Null,
    Bool(bool),
    /// May be infinite: `1e400` is a number JavaScript reads as `Infinity`.
    Number(f64),
    String(String),
    Array(Vec<Json>),
    Object(JsonObject),
}

/// An object whose keys keep the order they were first written in; a repeated key
/// keeps its first place and its last value, as in JavaScript.
#[derive(Clone, Debug, Default, PartialEq)]
pub struct JsonObject {
    entries: Vec<(String, Json)>,
    index: HashMap<String, usize>,
}

impl JsonObject {
    pub fn get(&self, key: &str) -> Option<&Json> {
        self.index.get(key).map(|at| &self.entries[*at].1)
    }

    pub fn contains_key(&self, key: &str) -> bool {
        self.index.contains_key(key)
    }

    pub fn keys(&self) -> impl Iterator<Item = &str> {
        self.entries.iter().map(|(key, _)| key.as_str())
    }

    pub fn entries(&self) -> impl Iterator<Item = (&str, &Json)> {
        self.entries.iter().map(|(key, value)| (key.as_str(), value))
    }

    fn insert(&mut self, key: String, value: Json) {
        match self.index.get(&key) {
            Some(at) => self.entries[*at].1 = value,
            None => {
                self.index.insert(key.clone(), self.entries.len());
                self.entries.push((key, value));
            }
        }
    }
}

/// What kind of value a `Json` is, as zod names the types in its messages.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum JsonType {
    Null,
    Boolean,
    Number,
    String,
    Array,
    Object,
}

impl JsonType {
    pub const ALL: [JsonType; 6] = [JsonType::Null, JsonType::Boolean, JsonType::Number, JsonType::String, JsonType::Array, JsonType::Object];

    pub fn name(self) -> &'static str {
        match self {
            JsonType::Null => "null",
            JsonType::Boolean => "boolean",
            JsonType::Number => "number",
            JsonType::String => "string",
            JsonType::Array => "array",
            JsonType::Object => "object",
        }
    }

    pub fn from_name(name: &str) -> Option<JsonType> {
        JsonType::ALL.into_iter().find(|kind| kind.name() == name)
    }
}

impl Json {
    pub fn type_of(&self) -> JsonType {
        match self {
            Json::Null => JsonType::Null,
            Json::Bool(_) => JsonType::Boolean,
            Json::Number(_) => JsonType::Number,
            Json::String(_) => JsonType::String,
            Json::Array(_) => JsonType::Array,
            Json::Object(_) => JsonType::Object,
        }
    }

    pub fn as_object(&self) -> Option<&JsonObject> {
        match self {
            Json::Object(object) => Some(object),
            _ => None,
        }
    }

    pub fn as_array(&self) -> Option<&[Json]> {
        match self {
            Json::Array(items) => Some(items),
            _ => None,
        }
    }

    pub fn as_str(&self) -> Option<&str> {
        match self {
            Json::String(text) => Some(text),
            _ => None,
        }
    }

    /// The number, when it is one JavaScript could do arithmetic on without it being infinite.
    pub fn as_finite(&self) -> Option<f64> {
        match self {
            Json::Number(number) if number.is_finite() => Some(*number),
            _ => None,
        }
    }
}

impl Json {
    /// A number as JavaScript's `String(number)` writes it, for the cases a message needs.
    pub fn number_text(number: f64) -> String {
        if number.is_nan() {
            "NaN".to_string()
        } else if number.is_infinite() {
            if number < 0.0 { "-Infinity" } else { "Infinity" }.to_string()
        } else {
            format!("{number}")
        }
    }

    /// `JSON.stringify(value)`: a non-finite number becomes `null`, as it does there.
    pub fn stringify(&self) -> String {
        let mut out = String::new();
        self.write(&mut out);
        out
    }

    fn write(&self, out: &mut String) {
        match self {
            Json::Null => out.push_str("null"),
            Json::Bool(flag) => out.push_str(if *flag { "true" } else { "false" }),
            Json::Number(number) if number.is_finite() => out.push_str(&Json::number_text(*number)),
            Json::Number(_) => out.push_str("null"),
            Json::String(text) => write_string(text, out),
            Json::Array(items) => {
                out.push('[');
                for (index, item) in items.iter().enumerate() {
                    if index > 0 {
                        out.push(',');
                    }
                    item.write(out);
                }
                out.push(']');
            }
            Json::Object(object) => {
                out.push('{');
                for (index, (key, value)) in object.entries().enumerate() {
                    if index > 0 {
                        out.push(',');
                    }
                    write_string(key, out);
                    out.push(':');
                    value.write(out);
                }
                out.push('}');
            }
        }
    }
}

fn write_string(text: &str, out: &mut String) {
    out.push('"');
    for c in text.chars() {
        match c {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            '\u{8}' => out.push_str("\\b"),
            '\u{c}' => out.push_str("\\f"),
            c if (c as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", c as u32)),
            c => out.push(c),
        }
    }
    out.push('"');
}

/// Why text isn't JSON, with the place it went wrong.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum JsonFault {
    Empty,
    EndsEarly,
    Unexpected { found: char, line: usize, column: usize },
    BadEscape { line: usize, column: usize },
    BadNumber { line: usize, column: usize },
    RawControl { line: usize, column: usize },
    TrailingText { line: usize, column: usize },
}

/// Why text could not be read as a tree's JSON.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Unreadable {
    NotJson(JsonFault),
    /// Valid JSON that nests more levels than this build reads.
    TooDeep { limit: usize },
}

impl From<JsonFault> for Unreadable {
    fn from(fault: JsonFault) -> Unreadable {
        Unreadable::NotJson(fault)
    }
}

pub fn parse(text: &str) -> Result<Json, Unreadable> {
    Parser { chars: text.char_indices().peekable(), text, line: 1, line_start: 0 }.document()
}

type Chars<'a> = std::iter::Peekable<std::str::CharIndices<'a>>;

struct Parser<'a> {
    chars: Chars<'a>,
    text: &'a str,
    line: usize,
    line_start: usize,
}

/// A container being filled; the parser keeps these on its own stack, so depth never recurses.
enum Open {
    Array(Vec<Json>),
    /// An object, and the key whose value is being read.
    Object { object: JsonObject, key: String },
}

impl Parser<'_> {
    fn column(&self, at: usize) -> usize {
        self.text[self.line_start..at].chars().count() + 1
    }

    fn whitespace(&mut self) {
        while let Some(&(at, c)) = self.chars.peek() {
            match c {
                ' ' | '\t' | '\r' => {}
                '\n' => {
                    self.line += 1;
                    self.line_start = at + 1;
                }
                _ => return,
            }
            self.chars.next();
        }
    }

    fn unexpected(&mut self) -> JsonFault {
        match self.chars.peek() {
            Some(&(at, found)) => JsonFault::Unexpected { found, line: self.line, column: self.column(at) },
            None => JsonFault::EndsEarly,
        }
    }

    fn document(mut self) -> Result<Json, Unreadable> {
        self.whitespace();
        if self.chars.peek().is_none() {
            return Err(JsonFault::Empty.into());
        }
        let mut stack: Vec<Open> = Vec::new();
        loop {
            self.whitespace();
            let mut finished = match self.chars.peek().copied() {
                None => return Err(JsonFault::EndsEarly.into()),
                Some((_, '[')) => {
                    self.chars.next();
                    self.whitespace();
                    if matches!(self.chars.peek(), Some(&(_, ']'))) {
                        self.chars.next();
                        Json::Array(Vec::new())
                    } else {
                        self.open(&mut stack, Open::Array(Vec::new()))?;
                        continue;
                    }
                }
                Some((_, '{')) => {
                    self.chars.next();
                    self.whitespace();
                    if matches!(self.chars.peek(), Some(&(_, '}'))) {
                        self.chars.next();
                        Json::Object(JsonObject::default())
                    } else {
                        let key = self.key()?;
                        self.open(&mut stack, Open::Object { object: JsonObject::default(), key })?;
                        continue;
                    }
                }
                Some((_, '"')) => Json::String(self.string()?),
                Some((_, 't')) => self.word("true", Json::Bool(true))?,
                Some((_, 'f')) => self.word("false", Json::Bool(false))?,
                Some((_, 'n')) => self.word("null", Json::Null)?,
                Some((_, '-' | '0'..='9')) => self.number()?,
                Some(_) => return Err(self.unexpected().into()),
            };
            loop {
                let Some(top) = stack.pop() else {
                    self.whitespace();
                    return match self.chars.peek().copied() {
                        None => Ok(finished),
                        Some((at, _)) => Err(JsonFault::TrailingText { line: self.line, column: self.column(at) }.into()),
                    };
                };
                self.whitespace();
                let next = self.chars.peek().copied();
                match top {
                    Open::Array(mut items) => {
                        items.push(finished);
                        match next {
                            Some((_, ',')) => {
                                self.chars.next();
                                stack.push(Open::Array(items));
                                break;
                            }
                            Some((_, ']')) => {
                                self.chars.next();
                                finished = Json::Array(items);
                            }
                            _ => return Err(self.unexpected().into()),
                        }
                    }
                    Open::Object { mut object, key } => {
                        object.insert(key, finished);
                        match next {
                            Some((_, ',')) => {
                                self.chars.next();
                                self.whitespace();
                                let key = self.key()?;
                                stack.push(Open::Object { object, key });
                                break;
                            }
                            Some((_, '}')) => {
                                self.chars.next();
                                finished = Json::Object(object);
                            }
                            _ => return Err(self.unexpected().into()),
                        }
                    }
                }
            }
        }
    }

    fn open(&mut self, stack: &mut Vec<Open>, container: Open) -> Result<(), Unreadable> {
        if stack.len() >= MAX_DEPTH {
            return Err(Unreadable::TooDeep { limit: MAX_DEPTH });
        }
        stack.push(container);
        Ok(())
    }

    /// A key and the colon after it.
    fn key(&mut self) -> Result<String, JsonFault> {
        if !matches!(self.chars.peek(), Some(&(_, '"'))) {
            return Err(self.unexpected());
        }
        let key = self.string()?;
        self.whitespace();
        match self.chars.peek() {
            Some(&(_, ':')) => {
                self.chars.next();
                Ok(key)
            }
            _ => Err(self.unexpected()),
        }
    }

    fn word(&mut self, word: &str, value: Json) -> Result<Json, JsonFault> {
        for expected in word.chars() {
            match self.chars.peek() {
                Some(&(_, c)) if c == expected => {
                    self.chars.next();
                }
                _ => return Err(self.unexpected()),
            }
        }
        Ok(value)
    }

    fn number(&mut self) -> Result<Json, JsonFault> {
        let start = self.chars.peek().map_or(0, |&(at, _)| at);
        let bad = |parser: &Self| JsonFault::BadNumber { line: parser.line, column: parser.column(start) };
        let digits = |parser: &mut Self| {
            let mut count = 0;
            while matches!(parser.chars.peek(), Some(&(_, '0'..='9'))) {
                parser.chars.next();
                count += 1;
            }
            count
        };
        if matches!(self.chars.peek(), Some(&(_, '-'))) {
            self.chars.next();
        }
        match self.chars.peek() {
            Some(&(_, '0')) => {
                self.chars.next();
                if matches!(self.chars.peek(), Some(&(_, '0'..='9'))) {
                    return Err(bad(self));
                }
            }
            Some(&(_, '1'..='9')) => {
                digits(self);
            }
            _ => return Err(bad(self)),
        }
        if matches!(self.chars.peek(), Some(&(_, '.'))) {
            self.chars.next();
            if digits(self) == 0 {
                return Err(bad(self));
            }
        }
        if matches!(self.chars.peek(), Some(&(_, 'e' | 'E'))) {
            self.chars.next();
            if matches!(self.chars.peek(), Some(&(_, '+' | '-'))) {
                self.chars.next();
            }
            if digits(self) == 0 {
                return Err(bad(self));
            }
        }
        let end = self.chars.peek().map_or(self.text.len(), |&(at, _)| at);
        match self.text[start..end].parse::<f64>() {
            Ok(number) => Ok(Json::Number(number)),
            Err(_) => Err(bad(self)),
        }
    }

    fn hex4(&mut self, escape_at: usize) -> Result<u32, JsonFault> {
        let mut code = 0;
        for _ in 0..4 {
            match self.chars.next() {
                Some((_, c)) => match c.to_digit(16) {
                    Some(digit) => code = code * 16 + digit,
                    None => return Err(JsonFault::BadEscape { line: self.line, column: self.column(escape_at) }),
                },
                None => return Err(JsonFault::EndsEarly),
            }
        }
        Ok(code)
    }

    fn string(&mut self) -> Result<String, JsonFault> {
        self.chars.next();
        let mut out = String::new();
        loop {
            let Some((at, c)) = self.chars.next() else { return Err(JsonFault::EndsEarly) };
            match c {
                '"' => return Ok(out),
                '\\' => {
                    let Some((_, escape)) = self.chars.next() else { return Err(JsonFault::EndsEarly) };
                    match escape {
                        '"' => out.push('"'),
                        '\\' => out.push('\\'),
                        '/' => out.push('/'),
                        'b' => out.push('\u{8}'),
                        'f' => out.push('\u{c}'),
                        'n' => out.push('\n'),
                        'r' => out.push('\r'),
                        't' => out.push('\t'),
                        'u' => {
                            let code = self.hex4(at)?;
                            out.push(self.scalar(code, at)?);
                        }
                        _ => return Err(JsonFault::BadEscape { line: self.line, column: self.column(at) }),
                    }
                }
                c if (c as u32) < 0x20 => return Err(JsonFault::RawControl { line: self.line, column: self.column(at) }),
                c => out.push(c),
            }
        }
    }

    /// The character a `\uXXXX` escape names; a high surrogate takes the low one that follows it.
    fn scalar(&mut self, code: u32, escape_at: usize) -> Result<char, JsonFault> {
        match code {
            0xD800..=0xDBFF => {
                let mut ahead = self.chars.clone();
                if let (Some((_, '\\')), Some((_, 'u'))) = (ahead.next(), ahead.next()) {
                    let mut low = 0;
                    let mut digits = 0;
                    for (_, c) in ahead.by_ref().take(4) {
                        match c.to_digit(16) {
                            Some(digit) => {
                                low = low * 16 + digit;
                                digits += 1;
                            }
                            None => break,
                        }
                    }
                    if digits == 4 && (0xDC00..=0xDFFF).contains(&low) {
                        self.chars = ahead;
                        let joined = 0x10000 + ((code - 0xD800) << 10) + (low - 0xDC00);
                        return Ok(char::from_u32(joined).unwrap_or(char::REPLACEMENT_CHARACTER));
                    }
                }
                Ok(char::REPLACEMENT_CHARACTER)
            }
            0xDC00..=0xDFFF => Ok(char::REPLACEMENT_CHARACTER),
            _ => char::from_u32(code).ok_or(JsonFault::BadEscape { line: self.line, column: self.column(escape_at) }),
        }
    }
}
