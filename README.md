# @whiteintel/mcp-server

[![npm](https://img.shields.io/npm/v/@whiteintel/mcp-server.svg)](https://www.npmjs.com/package/@whiteintel/mcp-server)
[![CI](https://github.com/Hei33enberg/whiteintel-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/Hei33enberg/whiteintel-mcp-server/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

**Trace ownership. Expose the network.** A [Model Context Protocol](https://modelcontextprotocol.io)
server that gives any AI agent (Claude Desktop, Cursor, …) **corporate & offshore
ownership intelligence** from [WhiteIntel](https://whiteintel.dev): look up companies,
search entities (companies **and** people), screen sanctions, and trace ownership
chains to the ultimate beneficial owner.

**Freemium** — works anonymously on the free tier, or set `WHITEINTEL_API_KEY` to
authenticate as your plan and lift the limits (see [Configuration](#configuration)).
Forwards to WhiteIntel's public REST API
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
      "args": ["-y", "@whiteintel/mcp-server"],
      "env": { "WHITEINTEL_API_KEY": "wi_…" }
    }
  }
}
```

The `env` block is optional — omit it to use the anonymous free tier.

## Tools

| Tool | What it does |
| --- | --- |
| `lookup_company` | UK company by Companies House number → record + ownership graph (officers, PSCs, parent/subsidiary edges). |
| `search_companies` | Free-text company-name search → registration number. |
| `search_entities` | Search the corpus (companies + people), live + demo investigations → entity ids. |
| `get_entity` | Full record for one entity + its direct relationships. |
| `get_dossier` | Structured, fully-cited dossier: cross-source identity, ownership/UBO chain, risk signals, provenance. |
| `trace_ownership_path` | Walk ownership upward from a root entity to the ultimate beneficial owner. |
| `lookup_by_identifier` | Resolve an entity by a strong id — LEI, OFAC/EU/UN/UK sanctions id, UEN, NIP, SEC CIK, KRS, GB-COH. |
| `get_sanctions` | An entity's sanctions exposure (OFAC/EU/UN/UK) for it and its resolved cluster siblings, with sources. |
| `check_offshore_exposure` | Walk the ownership chain and flag sanctioned + secrecy-jurisdiction hops (offshore-layering lead). |

## Data & honesty

- **Live corpus:** sanctions (OFAC SDN, EU, UN, UK), GLEIF (LEI), ICIJ Offshore
  Leaks, SEC EDGAR, OpenOwnership (UK PSC), plus live UK Companies House lookup —
  cross-source-resolved (a sanctioned party linked to its offshore/registry records).
- **Demo:** three worked investigations — Meridian (BVI UBO chain), Tideway
  (sanctions exposure), Ardent (VAT-carousel) — flagged `source: "demo"`.
- An absent edge means "not yet observed", not "does not exist".
- Investigative **decision-support**, not a legal determination of beneficial ownership.

## Configuration

| Env var | Default | Purpose |
| --- | --- | --- |
| `WHITEINTEL_API_KEY` | _(none)_ | Optional `wi_` key (whiteintel.dev → Settings → API keys). Forwarded as a Bearer token to authenticate as your plan and lift free-tier limits. |
| `WHITEINTEL_API_BASE` | `https://whiteintel.dev` | API origin (SSRF-guarded to whiteintel.dev hosts). |
| `WHITEINTEL_TIMEOUT_MS` | `30000` | Per-request timeout. |

## License

MIT © whiteintel.dev
