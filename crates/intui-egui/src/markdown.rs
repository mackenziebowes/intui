//! Markdown read into blocks and styled runs, ready to draw.
//!
//! The promise: what comes out holds only text the author meant to show. Raw HTML is dropped, and the contents of
//! `<script>`, `<style>` and the other elements a browser would not show go with it; a link keeps its address only when it is
//! http, https or mailto; an image shows as its alt text. `pulldown-cmark` reads the Markdown; nothing here draws.

use pulldown_cmark::{CodeBlockKind, Event, HeadingLevel, Options, Parser, Tag, TagEnd};

/// A run of text that shares one style.
#[derive(Clone, Debug, Default, PartialEq)]
pub(crate) struct Span {
    pub text: String,
    pub strong: bool,
    pub emphasis: bool,
    pub strike: bool,
    pub code: bool,
    /// Where the run goes when pressed; only ever a safe address.
    pub link: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub(crate) enum Block {
    Paragraph(Vec<Span>),
    Heading { level: u8, spans: Vec<Span> },
    Code(String),
    Quote(Vec<Block>),
    List { first: Option<u64>, items: Vec<Vec<Block>> },
    Rule,
    Table { head: Vec<Vec<Span>>, rows: Vec<Vec<Vec<Span>>> },
}

const SWALLOWED: [&str; 11] = ["script", "style", "iframe", "object", "embed", "noscript", "template", "textarea", "title", "xmp", "noembed"];

/// The element an inline HTML tag opens, when its contents must not show.
fn swallowed_open(tag: &str) -> Option<&'static str> {
    let name = tag.strip_prefix('<')?.trim_start().to_ascii_lowercase();
    if name.starts_with('/') {
        return None;
    }
    SWALLOWED.into_iter().find(|element| name.strip_prefix(element).is_some_and(|rest| !rest.starts_with(|c: char| c.is_ascii_alphanumeric())))
}

fn closes(tag: &str, element: &str) -> bool {
    tag.strip_prefix("</").is_some_and(|rest| rest.trim_start().to_ascii_lowercase().starts_with(element))
}

/// Whether an address may be followed: an explicit http, https or mailto scheme.
fn is_safe_link(url: &str) -> bool {
    let squashed: String = url.chars().filter(|c| !c.is_control() && !c.is_whitespace()).collect::<String>().to_ascii_lowercase();
    ["https:", "http:", "mailto:"].iter().any(|scheme| squashed.starts_with(scheme))
}

fn heading_level(level: HeadingLevel) -> u8 {
    match level {
        HeadingLevel::H1 => 1,
        HeadingLevel::H2 => 2,
        HeadingLevel::H3 => 3,
        HeadingLevel::H4 => 4,
        HeadingLevel::H5 => 5,
        HeadingLevel::H6 => 6,
    }
}

struct Reader<'a> {
    events: std::iter::Peekable<Parser<'a>>,
    strong: u32,
    emphasis: u32,
    strike: u32,
    links: Vec<Option<String>>,
    swallowing: Option<&'static str>,
}

pub(crate) fn parse(markdown: &str) -> Vec<Block> {
    let options = Options::ENABLE_STRIKETHROUGH | Options::ENABLE_TABLES;
    let mut reader = Reader { events: Parser::new_ext(markdown, options).peekable(), strong: 0, emphasis: 0, strike: 0, links: Vec::new(), swallowing: None };
    reader.blocks(None)
}

impl Reader<'_> {
    fn span(&self, text: &str, code: bool) -> Span {
        Span {
            text: text.to_string(),
            strong: self.strong > 0,
            emphasis: self.emphasis > 0,
            strike: self.strike > 0,
            code,
            link: self.links.iter().rev().find_map(|link| link.clone()),
        }
    }

    /// Reads blocks until the end of the container that opened them (or the end of the text).
    fn blocks(&mut self, until: Option<TagEnd>) -> Vec<Block> {
        let mut blocks = Vec::new();
        let mut loose: Vec<Span> = Vec::new();
        let flush = |loose: &mut Vec<Span>, blocks: &mut Vec<Block>| {
            if !loose.is_empty() {
                blocks.push(Block::Paragraph(std::mem::take(loose)));
            }
        };
        while let Some(event) = self.events.next() {
            if let Event::End(end) = &event {
                if Some(*end) == until {
                    break;
                }
            }
            if self.swallow(&event) {
                continue;
            }
            match event {
                Event::Start(Tag::Paragraph) => {
                    flush(&mut loose, &mut blocks);
                    let spans = self.inline(TagEnd::Paragraph);
                    blocks.push(Block::Paragraph(spans));
                }
                Event::Start(Tag::Heading { level, .. }) => {
                    flush(&mut loose, &mut blocks);
                    let spans = self.inline(TagEnd::Heading(level));
                    blocks.push(Block::Heading { level: heading_level(level), spans });
                }
                Event::Start(Tag::CodeBlock(kind)) => {
                    flush(&mut loose, &mut blocks);
                    let end = TagEnd::CodeBlock;
                    let _fence = matches!(kind, CodeBlockKind::Fenced(_));
                    let mut code = String::new();
                    for inner in self.events.by_ref() {
                        match inner {
                            Event::Text(text) => code.push_str(&text),
                            Event::End(found) if found == end => break,
                            _ => {}
                        }
                    }
                    blocks.push(Block::Code(code.trim_end_matches('\n').to_string()));
                }
                Event::Start(Tag::BlockQuote(kind)) => {
                    flush(&mut loose, &mut blocks);
                    let inner = self.blocks(Some(TagEnd::BlockQuote(kind)));
                    blocks.push(Block::Quote(inner));
                }
                Event::Start(Tag::List(first)) => {
                    flush(&mut loose, &mut blocks);
                    let mut items = Vec::new();
                    while let Some(next) = self.events.next() {
                        match next {
                            Event::Start(Tag::Item) => items.push(self.blocks(Some(TagEnd::Item))),
                            Event::End(TagEnd::List(_)) => break,
                            _ => {}
                        }
                    }
                    blocks.push(Block::List { first, items });
                }
                Event::Start(Tag::Table(_)) => {
                    flush(&mut loose, &mut blocks);
                    blocks.push(self.table());
                }
                Event::Rule => {
                    flush(&mut loose, &mut blocks);
                    blocks.push(Block::Rule);
                }
                other => {
                    if let Some(span) = self.inline_event(other) {
                        loose.push(span);
                    }
                }
            }
        }
        flush(&mut loose, &mut blocks);
        blocks
    }

    /// Reads a run of inline events up to `end`.
    fn inline(&mut self, end: TagEnd) -> Vec<Span> {
        let mut spans = Vec::new();
        while let Some(event) = self.events.next() {
            if matches!(&event, Event::End(found) if *found == end) {
                break;
            }
            if self.swallow(&event) {
                continue;
            }
            if let Some(span) = self.inline_event(event) {
                spans.push(span);
            }
        }
        spans
    }

    /// Whether `event` is raw HTML, or sits inside an element whose contents must not show.
    fn swallow(&mut self, event: &Event) -> bool {
        match event {
            Event::Html(_) => true,
            Event::InlineHtml(tag) => {
                match self.swallowing {
                    Some(element) if closes(tag, element) => self.swallowing = None,
                    Some(_) => {}
                    None => self.swallowing = swallowed_open(tag),
                }
                true
            }
            _ => self.swallowing.is_some(),
        }
    }

    fn inline_event(&mut self, event: Event) -> Option<Span> {
        match event {
            Event::Text(text) => Some(self.span(&text, false)),
            Event::Code(text) => Some(self.span(&text, true)),
            Event::SoftBreak => Some(self.span(" ", false)),
            Event::HardBreak => Some(self.span("\n", false)),
            Event::Start(Tag::Strong) => {
                self.strong += 1;
                None
            }
            Event::End(TagEnd::Strong) => {
                self.strong = self.strong.saturating_sub(1);
                None
            }
            Event::Start(Tag::Emphasis) => {
                self.emphasis += 1;
                None
            }
            Event::End(TagEnd::Emphasis) => {
                self.emphasis = self.emphasis.saturating_sub(1);
                None
            }
            Event::Start(Tag::Strikethrough) => {
                self.strike += 1;
                None
            }
            Event::End(TagEnd::Strikethrough) => {
                self.strike = self.strike.saturating_sub(1);
                None
            }
            Event::Start(Tag::Link { dest_url, .. }) => {
                self.links.push(is_safe_link(&dest_url).then(|| dest_url.to_string()));
                None
            }
            Event::End(TagEnd::Link) => {
                self.links.pop();
                None
            }
            _ => None,
        }
    }

    fn table(&mut self) -> Block {
        let mut head: Vec<Vec<Span>> = Vec::new();
        let mut rows: Vec<Vec<Vec<Span>>> = Vec::new();
        let mut current: Vec<Vec<Span>> = Vec::new();
        while let Some(event) = self.events.next() {
            match event {
                Event::Start(Tag::TableCell) => {
                    let cell = self.inline(TagEnd::TableCell);
                    current.push(cell);
                }
                Event::End(TagEnd::TableHead) => head = std::mem::take(&mut current),
                Event::End(TagEnd::TableRow) => rows.push(std::mem::take(&mut current)),
                Event::End(TagEnd::Table) => break,
                _ => {}
            }
        }
        Block::Table { head, rows }
    }
}
