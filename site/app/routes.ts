import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Serves the single-source resume.json straight from the repo root — the
  // same file the MCP server and shared/search.ts read. No copy in site/.
  route("resume.json", "routes/resume-json.tsx"),
] satisfies RouteConfig;
