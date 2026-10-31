#!/usr/bin/env node
/**
 * check-design.mjs
 *
 * Structural guard for DESIGN.md section 10's enforcement rules that a
 * plain linter config can't express: no-raw-colors, no-arbitrary-values,
 * no-inline-styles. Scans src/ for hex/rgb color literals, Tailwind
 * arbitrary-value syntax (e.g. `p-[13px]`), inline `style={{...}}`, and
 * usage of Tailwind's default color palette (removed via `--color-*:
 * initial` in src/index.css, so any leftover `bg-blue-500`-style class
 * silently renders nothing).
 *
 * Known gaps (per DESIGN.md section 10): this can't judge layout
 * structure or the diamond decoration. Those rely on visual review
 * against the reference screen.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, "src");
const TOKEN_FILE = join(SRC_DIR, "index.css");
const CHECK_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".css"]);

const HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/g;
const RGB_COLOR = /\brgba?\(\s*\d/g;
const ARBITRARY_VALUE = /[a-zA-Z][a-zA-Z0-9]*-\[[^\]\s"'`]+\]/g;
const INLINE_STYLE = /\bstyle\s*=\s*{{/g;

const TAILWIND_DEFAULT_COLORS = [
  "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
  "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
  "indigo", "violet", "purple", "fuchsia", "pink", "rose", "black",
];
const DEFAULT_COLOR_CLASS = new RegExp(
  `\\b(?:bg|text|border|ring|fill|stroke|from|via|to|shadow|outline|accent|caret|divide)-` +
    `(?:${TAILWIND_DEFAULT_COLORS.join("|")})-\\d{2,3}\\b`,
  "g"
);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const info = statSync(full);
    if (info.isDirectory()) walk(full, files);
    else if (CHECK_EXTENSIONS.has(extname(full))) files.push(full);
  }
  return files;
}

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

function collect(regex, text, rule) {
  return [...text.matchAll(regex)].map((m) => ({
    rule,
    line: lineOf(text, m.index),
    match: m[0],
  }));
}

function checkFile(file) {
  const text = readFileSync(file, "utf8");
  const isTokenFile = file === TOKEN_FILE;

  let violations = [];
  if (!isTokenFile) {
    violations = violations.concat(
      collect(HEX_COLOR, text, "no-raw-colors"),
      collect(RGB_COLOR, text, "no-raw-colors"),
      collect(DEFAULT_COLOR_CLASS, text, "no-raw-colors")
    );
  }
  violations = violations.concat(
    collect(ARBITRARY_VALUE, text, "no-arbitrary-values"),
    collect(INLINE_STYLE, text, "no-inline-styles")
  );

  return violations.map((v) => ({ ...v, file: relative(ROOT, file).replace(/\\/g, "/") }));
}

const files = walk(SRC_DIR);
const violations = files.flatMap(checkFile);

if (violations.length === 0) {
  console.log(`lint:design — checked ${files.length} file(s) in src/, no violations found.`);
  process.exit(0);
}

console.error(`lint:design — ${violations.length} violation(s) found:\n`);
for (const v of violations.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
  console.error(`  ${v.file}:${v.line}  [${v.rule}]  ${v.match}`);
}
console.error("\nFix these, or if the value is intentional, update DESIGN.md and the tokens together (section 9).");
process.exit(1);
