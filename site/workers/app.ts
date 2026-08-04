import { createRequestHandler } from "react-router";
import { ResumeMCP } from "./mcp";

// The Durable Object class must be a named export of the Worker's main module
// so Cloudflare can bind it (see wrangler.jsonc → durable_objects / migrations).
export { ResumeMCP };

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // /mcp → the resume MCP server (Streamable HTTP). Any remote MCP client
    // (a claude.ai connector, etc.) can point here. Everything else is the site.
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return ResumeMCP.serve("/mcp", { binding: "ResumeMCP" }).fetch(
        request,
        env,
        ctx,
      );
    }

    return requestHandler(request);
  },
} satisfies ExportedHandler<Env>;
