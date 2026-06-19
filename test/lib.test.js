// Unit tests for the pure helpers (no network, no server).
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveBase, qs, DEFAULT_BASE } from "../lib.js";

const silent = () => {};

test("resolveBase: empty → default", () => {
  assert.equal(resolveBase("", silent), DEFAULT_BASE);
  assert.equal(resolveBase(undefined, silent), DEFAULT_BASE);
});

test("resolveBase: allowed https host → origin", () => {
  assert.equal(resolveBase("https://whiteintel.dev", silent), "https://whiteintel.dev");
  assert.equal(resolveBase("https://whiteintel.vercel.app/x", silent), "https://whiteintel.vercel.app");
});

test("resolveBase: SSRF guard rejects http / localhost / metadata / unknown host", () => {
  assert.equal(resolveBase("http://whiteintel.dev", silent), DEFAULT_BASE);
  assert.equal(resolveBase("https://localhost", silent), DEFAULT_BASE);
  assert.equal(resolveBase("https://169.254.169.254", silent), DEFAULT_BASE);
  assert.equal(resolveBase("https://evil.com", silent), DEFAULT_BASE);
  assert.equal(resolveBase("https://whiteintel.dev.evil.com", silent), DEFAULT_BASE);
  assert.equal(resolveBase("not a url", silent), DEFAULT_BASE);
});

test("qs: skips empty/null/undefined and prefixes ?", () => {
  assert.equal(qs({ a: 1, b: undefined, c: null, d: "" }), "?a=1");
  assert.equal(qs({}), "");
  assert.equal(qs({ q: "meridian", limit: 8 }), "?q=meridian&limit=8");
});
