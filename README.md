# resume-mcp

My resume, as a **single source of truth** with three faces:

- a **website** for humans,
- a **Model Context Protocol (MCP) server** for AI agents,
- one `resume.json` + one shared search function that both read.

The point is the shape, not the size: a typed boundary, validated arguments,
predictable payloads — the same integration work I do all day.

---

## Layout

```
resume.json          ← the single source of truth (JSON Resume schema)
shared/search.ts     ← searchBySkill(resume, skill) — imported by every artifact
server-local/        ← stdio MCP server (Claude Desktop, Claude Code)
site/                ← React Router v7 site on Cloudflare Workers
worker/              ← (roadmap) the same MCP server over HTTP, for remote clients
```

Everything reads the **one** `resume.json` and the **one** `shared/search.ts`, so
the data and the tool logic can never drift between artifacts.

---

## 1. The MCP server (local / stdio)

Exposes the resume as callable tools instead of prose.

**Tools:** `get_experience` · `get_skills` · `get_projects` · `search_resume` ·
`years_of_experience` · `contact`
**Resources:** `resume://full` (application/json) · `resume://summary` (text/plain)

### Build & run

```bash
npm install
npm run build          # tsc → dist/server-local/src/index.js
npm start              # runs the stdio server
```

### Connect to Claude Desktop

Add to `claude_desktop_config.json`, then fully quit and reopen Claude Desktop:

```json
{
  "mcpServers": {
    "resume": {
      "command": "node",
      "args": ["/absolute/path/to/resume-mcp/dist/server-local/src/index.js"]
    }
  }
}
```

Then ask your own Claude, e.g. *"use the resume server to search for Kafka"*.

---

## 2. The website

An editorial one-pager (the "Classical" design system) that also documents and
advertises the MCP server.

```bash
cd site
npm install
npm run dev            # http://localhost:5173  (hot reload)
npm run build          # production build
npm run deploy         # build + wrangler deploy  (needs `wrangler login` first)
```

The site's `/resume.json` route serves the **repo-root** `resume.json` verbatim —
no copy — so the download and the MCP server always agree.

---

## 3. HTTP MCP endpoint — roadmap

A Cloudflare Worker (or a `/mcp` route mounted into the site Worker) that exposes
the same tools over Streamable HTTP, so any remote client (e.g. a claude.ai
connector) can query the resume without cloning anything. It reuses the same
`resume.json` and `shared/search.ts` as the local server.

---

_Surya Prakash Rao Kapila — Hyderabad, India._
