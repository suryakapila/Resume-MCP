# resume-mcp

My resume, as a **single source of truth** with three faces:

- a **website** for humans,
- a **local (stdio) MCP server** for AI agents on your machine,
- a **hosted (HTTP) MCP server** any remote client can connect to,

all reading one `resume.json` and one shared search function, so nothing drifts.

**Live:**

- Website: **https://surya-resume-site.suryakapila.workers.dev**
- Hosted MCP endpoint: **https://surya-resume-site.suryakapila.workers.dev/mcp**

The point is the shape, not the size: a typed boundary, validated arguments,
predictable payloads. The same backend systems I build every day.

---

## Layout

```
resume.json          <- the single source of truth (JSON Resume schema)
shared/search.ts     <- searchBySkill(resume, skill), imported by every artifact
server-local/        <- stdio MCP server (Claude Desktop, Claude Code)
site/                <- React Router v7 site + hosted /mcp endpoint, on Cloudflare Workers
```

Everything reads the **one** `resume.json` and the **one** `shared/search.ts`, so
the data and the tool logic can never drift between artifacts.

**Tools:** `get_summary` &middot; `get_section` (work | education | skills | projects) &middot; `search_by_skill`
**Resource:** `resume://full` (application/json)

---

## 1. Local MCP server (stdio)

Exposes the resume as callable tools instead of prose.

### Build & run

```bash
npm install
npm run build          # tsc -> dist/server-local/src/index.js
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

## 2. Hosted MCP endpoint (HTTP)

Live at **https://surya-resume-site.suryakapila.workers.dev/mcp** (Streamable HTTP).
It exposes the same tools and resource as the local server, reads the same
`resume.json` + `shared/search.ts`, and needs no clone and no key. It runs as a
Durable Object (`site/workers/mcp.ts`) mounted into the site Worker.

Connect it from any MCP client:

- **Claude (Desktop or web):** Settings, then Connectors, then Add custom
  connector, and paste the URL.
- **Claude Code:**
  ```bash
  claude mcp add --transport http resume https://surya-resume-site.suryakapila.workers.dev/mcp
  ```
- **Anything else:** add an MCP server with the **Streamable HTTP** transport and
  the URL. Opening the URL in a browser shows a short explainer page, not the raw
  protocol.

---

## 3. The website

An editorial one-pager (the "Classical" design system) that renders from
`resume.json` and documents the MCP servers.

```bash
cd site
npm install
npm run dev            # http://localhost:5173  (hot reload)
npm run build          # production build
npm run deploy         # build + wrangler deploy  (needs `wrangler login` first)
```

The site's `/resume.json` route serves the **repo-root** `resume.json` verbatim,
no copy, so the download, the page and the MCP servers always agree.

---

_Surya Prakash Rao Kapila, Hyderabad, India._
