import { createRequestHandler } from "react-router";
import { ResumeMCP } from "./mcp";

// The Durable Object class must be a named export of the Worker's main module
// so Cloudflare can bind it (see wrangler.jsonc -> durable_objects / migrations).
export { ResumeMCP };

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

// Friendly page shown when someone opens /mcp in a browser (a GET that wants
// HTML, not the SSE stream). Real MCP clients send Accept: text/event-stream
// and never see this. Explains what the endpoint is and how to connect it.
function mcpLanding(origin: string): Response {
  const url = `${origin}/mcp`;
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Resume MCP endpoint</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Lora:wght@400&display=swap">
<style>
  :root { --bg:#f3f2f2; --text:#201f1d; --accent:#b68235; --divider:color-mix(in srgb,#201f1d 16%,transparent); }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font-family:"Lora",Georgia,serif; line-height:1.6; }
  .wrap { max-width:640px; margin:0 auto; padding:64px 24px; }
  .kicker { font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:var(--accent); margin:0 0 20px; }
  h1 { font-family:"Cormorant Garamond",serif; font-weight:600; font-size:40px; line-height:1.1; letter-spacing:-0.01em; margin:0 0 16px; }
  p { font-size:16px; }
  .url { display:block; padding:12px 14px; border:1px solid var(--divider); border-radius:4px; font-family:ui-monospace,"SF Mono",Menlo,monospace; font-size:13px; word-break:break-all; background:#fff; margin:16px 0; }
  ol { padding-left:20px; }
  li { margin:8px 0; }
  pre { background:#1a1917; color:#f3f2f2; padding:12px 14px; border-radius:4px; overflow-x:auto; font-family:ui-monospace,"SF Mono",Menlo,monospace; font-size:12.5px; }
  a { color:var(--accent); }
  .back { display:inline-block; margin-top:28px; font-size:14px; }
  hr { border:0; border-top:1px solid var(--divider); margin:28px 0; }
</style>
</head>
<body>
<div class="wrap">
  <p class="kicker">Model Context Protocol &middot; Streamable HTTP</p>
  <h1>This is an MCP endpoint, not a web page.</h1>
  <p>You have reached the resume of Surya Prakash Rao Kapila, served as a live MCP server. It speaks the Model Context Protocol over HTTP, so it is meant to be connected from an AI client rather than opened in a browser. Any protocol error you saw is the endpoint correctly asking for an MCP client.</p>
  <code class="url">${url}</code>
  <p><strong>Connect it in a few seconds:</strong></p>
  <ol>
    <li>In Claude (Desktop or web): open Settings, then Connectors, then Add custom connector, and paste the URL above.</li>
    <li>In Claude Code, run:</li>
  </ol>
  <pre>claude mcp add --transport http resume ${url}</pre>
  <p>Then ask your own Claude anything about the resume: what he owns today, whether he has run Kafka in production, or why the 2020 to 2023 gap. Any Streamable HTTP MCP client works.</p>
  <hr>
  <a class="back" href="/">Back to the resume</a>
</div>
</body>
</html>`;
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // /mcp -> the resume MCP server (Streamable HTTP). Any remote MCP client
    // can point here. Everything else is the site.
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      const accept = request.headers.get("accept") ?? "";
      // A browser visit (GET wanting HTML, not the SSE stream) gets the
      // explainer page; real MCP clients pass straight through.
      if (
        request.method === "GET" &&
        accept.includes("text/html") &&
        !accept.includes("text/event-stream")
      ) {
        return mcpLanding(url.origin);
      }
      return ResumeMCP.serve("/mcp", { binding: "ResumeMCP" }).fetch(
        request,
        env,
        ctx,
      );
    }

    return requestHandler(request);
  },
} satisfies ExportedHandler<Env>;
