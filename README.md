# @whiteintel/mcp-server

[![npm](https://img.shields.io/npm/v/@whiteintel/mcp-server.svg)](https://www.npmjs.com/package/@whiteintel/mcp-server)
[![CI](https://github.com/Hei33enberg/whiteintel-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/Hei33enberg/whiteintel-mcp-server/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

**Trace ownership. Expose the network.** A [Model Context Protocol](https://modelcontextprotocol.io)
server that gives any AI agent (Claude Desktop, Cursor, …) **corporate & offshore
ownership intelligence** from [WhiteIntel](https://whiteintel.dev): look up UK
companies, search entities (companies **and** people), and trace ownership chains
to the ultimate beneficial owner.

Free & open, no auth. Forwards to WhiteIntel's public REST API
(`https://whiteintel.dev/api/public/*`) — [OpenAPI spec](https://whiteintel.dev/api/public/openapi.json).

## Install

No install needed — run via `npx`:

```bash
npx -y @whiteintel/mcp-server
```

### Claude Desktop / Cursor

Add to your MCP client config:

```json
{
  "mcpServers": {
    "whiteintel": {
      "command": "npx",
      "args": ["-y", "@whiteintel/mcp-server"]
    }
  }
}
```

## Tools

| Tool | What it does |
| --- | --- |
| `lookup_company` | UK company by Companies House number → record + ownership graph (officers, PSCs, parent/subsidiary edges). |
| `search_companies` | Free-text company-name search → registration number. |
| `search_entities` | Search the corpus (companies + people), live + demo investigations → entity ids. |
| `get_entity` | Full record for one entity + its direct relationships. |
| `trace_ownership_path` | Walk ownership upward from a root entity to the ultimate beneficial owner. |

## Data & honesty

- **Live:** UK Companies House (company + officer + PSC lookup).
- **Demo:** three worked investigations — Meridian (BVI UBO chain), Tideway
  (sanctions exposure), Ardent (VAT-carousel) — flagged `source: "demo"`.
- The offshore corpus (ICIJ Offshore Leaks et al.) is on the roadmap; an absent
  edge means "not yet observed", not "does not exist".
- Investigative **decision-support**, not a legal determination of beneficial ownership.

## Configuration

| Env var | Default | Purpose |
| --- | --- | --- |
| `WHITEINTEL_API_BASE` | `https://whiteintel.dev` | API origin (SSRF-guarded to whiteintel.dev hosts). |
| `WHITEINTEL_TIMEOUT_MS` | `30000` | Per-request timeout. |

## License

MIT © whiteintel.dev
