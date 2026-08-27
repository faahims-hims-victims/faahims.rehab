#!/usr/bin/env node
/**
 * fix-tokens.js — final build step for faahims.rehab
 *
 * Substitutes build-time tokens (${YEAR} and friends) in every generated .html
 * file, then fails the build if any unsubstituted placeholder survives.
 *
 * WHY THIS EXISTS
 * ---------------
 * ${YEAR} only interpolates inside a JS template literal. The eight content
 * pages are static files in the repo, so nothing ever interpolated them and
 * they shipped the literal text "${YEAR}" into <title>, <h1>, og:title,
 * twitter:title and JSON-LD — 61 occurrences across 8 of 9 pages.
 *
 * ORDERING MATTERS: this must run LAST, after every generator has written its
 * output. Artifact fingerprinting shows at least two generators write to this
 * repo (scrape-forum.js writes robots.txt/feed.xml/sitemap-index.xml/index.html
 * with a full-ISO timestamp; something else writes sitemap.xml with a date-only
 * lastmod). Wire this as its own workflow step after all of them.
 *
 * <script> HANDLING
 * -----------------
 * Executable <script> blocks are skipped so that legitimate runtime template
 * literals — `a[onclick*='${sectionId}']` and the like — are left alone.
 * <script type="application/ld+json"> is DATA, not code, and IS substituted:
 * 22 of the 61 leaks are inside JSON-LD name/headline fields.
 *
 * Usage:  node fix-tokens.js [--dir .] [--check]
 *         --check  report only, change nothing (still exits 1 on leaks)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const ROOT = (() => { const i = args.indexOf('--dir'); return i > -1 ? args[i + 1] : '.'; })();
const CHECK_ONLY = args.includes('--check');

const now = new Date();
const TOKENS = {
  YEAR: String(now.getUTCFullYear()),
  NEXT_YEAR: String(now.getUTCFullYear() + 1),
  MONTH: now.toLocaleString('en-US', { timeZone: 'UTC', month: 'long' }),
  DATE_ISO: now.toISOString().split('T')[0],
  BUILD: process.env.GITHUB_RUN_NUMBER || '0',
};

// Matches ${IDENT} / ${ IDENT } only — never expressions, so a stray
// `${foo.bar()}` in prose is reported as a leak rather than silently mangled.
const TOKEN_RE = /\$\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}/g;

// Split into alternating [text, script, text, script, ...] segments.
// Executable scripts are returned flagged so they can be passed through.
function splitScripts(html) {
  const parts = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let last = 0, m;
  while ((m = re.exec(html)) !== null) {
    parts.push({ code: false, text: html.slice(last, m.index) });
    const attrs = m[1] || '';
    const isData = /type\s*=\s*["']?application\/(ld\+json|json)["']?/i.test(attrs);
    parts.push({ code: !isData, text: m[0] });
    last = m.index + m[0].length;
  }
  parts.push({ code: false, text: html.slice(last) });
  return parts;
}

function processFile(file) {
  const original = fs.readFileSync(file, 'utf-8');
  const parts = splitScripts(original);
  const replaced = {};
  const unknown = new Set();

  const out = parts.map(p => {
    if (p.code) return p.text;                    // executable JS — leave alone
    return p.text.replace(TOKEN_RE, (whole, name) => {
      if (Object.prototype.hasOwnProperty.call(TOKENS, name)) {
        replaced[name] = (replaced[name] || 0) + 1;
        return TOKENS[name];
      }
      unknown.add(name);
      return whole;                                // leave it so the guard sees it
    });
  }).join('');

  const changed = out !== original;
  if (changed && !CHECK_ONLY) fs.writeFileSync(file, out);
  return { changed, replaced, unknown: [...unknown] };
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const files = walk(ROOT);
console.log(`fix-tokens: scanning ${files.length} .html file(s)${CHECK_ONLY ? ' (check only)' : ''}`);
console.log(`            tokens: ${Object.entries(TOKENS).map(([k, v]) => `\${${k}}=${v}`).join('  ')}`);

let touched = 0, totalReplaced = 0;
const leaks = [];

for (const f of files) {
  const r = processFile(f);
  if (r.changed) {
    touched++;
    const n = Object.values(r.replaced).reduce((a, b) => a + b, 0);
    totalReplaced += n;
    const detail = Object.entries(r.replaced).map(([k, v]) => `${k}x${v}`).join(' ');
    console.log(`  ${CHECK_ONLY ? 'would fix' : 'fixed'}  ${path.relative(ROOT, f)}  (${detail})`);
  }
  if (r.unknown.length) leaks.push({ file: path.relative(ROOT, f), names: r.unknown });
}

console.log(`fix-tokens: ${touched} file(s) ${CHECK_ONLY ? 'would change' : 'updated'}, ${totalReplaced} token(s) substituted`);

if (leaks.length) {
  console.error('\nFATAL: unsubstituted placeholders remain outside <script> blocks.');
  console.error('These would ship to Google as literal text. Add them to TOKENS or remove them.\n');
  for (const l of leaks) console.error(`  ${l.file}: ${l.names.map(n => '${' + n + '}').join(', ')}`);
  process.exit(1);
}

console.log('fix-tokens: no leaked placeholders. OK.');
