//! Who wrote a tree, and the rule that follows from it.
//!
//! Core's schema marks each kind with who may write it (`x-intui-writer`). A tree the model
//! wrote may hold only the kinds anyone may write; a tree code built, or one nobody checks,
//! may hold any. The rule is read from the committed schema, never listed here, so a kind
//! core makes code-only is refused here the moment the schema is regenerated.

use crate::node::{Drawn, Kind, Tree};
use crate::refusal::{Problem, ProblemKind};
use crate::schema::schema;

/// Who wrote the tree being parsed.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Author {
    /// The model wrote it directly: kinds that show numbers are refused.
    Model,
    /// Code built it, so every kind is allowed.
    Code,
    /// Nobody vouches for who wrote it and nothing is checked on that account.
    Unchecked,
}

/// Who may write a kind.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum Writer {
    Anyone,
    Code,
}

impl Kind {
    /// A schema that doesn't say makes the kind code-only, so a kind never reaches the model by omission.
    fn writer(self) -> Writer {
        match schema().writer_of(self.name()) {
            Some("anyone") => Writer::Anyone,
            _ => Writer::Code,
        }
    }
}

impl Author {
    fn may_write(self, kind: Kind) -> bool {
        match self {
            Author::Code | Author::Unchecked => true,
            Author::Model => kind.writer() == Writer::Anyone,
        }
    }

    /// Every node this author may not write, in core's `walk` order and path format.
    pub(crate) fn problems_in(self, tree: &Tree) -> Vec<Problem> {
        let mut problems = Vec::new();
        self.visit(tree.root(), String::from("root"), &mut problems);
        problems
    }

    fn visit(self, drawn: &Drawn, at: String, problems: &mut Vec<Problem>) {
        let Drawn::Known(node) = drawn else { return };
        if !self.may_write(node.kind()) {
            problems.push(Problem { path: format!("{at} ({})", node.kind().name()), kind: ProblemKind::ShowsNumbers });
        }
        for (index, child) in node.children().into_iter().enumerate() {
            self.visit(child, format!("{at}.children[{index}]"), problems);
        }
    }
}
