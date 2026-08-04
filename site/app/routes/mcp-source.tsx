// Serves the live MCP server source (server-local/src/index.ts) as text.
// `?raw` inlines the file's current contents at build time — one source, no copy.
import source from "../../../server-local/src/index.ts?raw";

export function loader() {
  return new Response(source, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
