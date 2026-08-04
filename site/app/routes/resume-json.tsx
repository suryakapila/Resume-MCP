// Resource route (no default export → no UI). Serves the repo-root resume.json
// verbatim so the "resume.json" download link and any MCP client fetch the same
// single source of truth the local server + shared/search.ts use.
import resume from "../../../resume.json";

export function loader() {
  return new Response(JSON.stringify(resume, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
