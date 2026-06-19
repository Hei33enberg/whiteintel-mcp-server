# Changelog

## 0.1.0 — 2026-06-19

Initial release. Stdio MCP server exposing WhiteIntel's public API as 5 tools:
`lookup_company`, `search_companies`, `search_entities`, `get_entity`,
`trace_ownership_path`. Forwards to `https://whiteintel.dev/api/public/*`
(SSRF-guarded base, 30s timeout). Free & open, no auth.
