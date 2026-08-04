import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

// Single source of truth - the same resume.json + search function the stdio
// server (server-local/) and the website use. No copies.
import resume from "../../resume.json";
import { searchBySkill } from "../../shared/search";

// Wrap any JS value as an MCP text tool-result.
const asText = (value: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
});

/**
 * The resume as a Model Context Protocol server, over Streamable HTTP.
 * Mounted at /mcp by workers/app.ts. Runs as a Durable Object (McpAgent handles
 * MCP session state); it's stateless in practice - every response derives from
 * the immutable resume.json bundled at build time.
 *
 * Tools/resource mirror server-local/src/index.ts exactly so the stdio server
 * and this HTTP server behave identically.
 */
export class ResumeMCP extends McpAgent<Env> {
  server = new McpServer({ name: "resume-mcp", version: "1.0.0" });

  async init() {
    // RESOURCE: the whole resume as one readable JSON document.
    this.server.registerResource(
      "full-resume",
      "resume://full",
      {
        title: "Full resume",
        description: "The complete resume as JSON (JSON Resume schema).",
        mimeType: "application/json",
      },
      async (uri) => ({
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(resume, null, 2),
          },
        ],
      }),
    );

    // TOOL: get_summary - zero-argument headline pitch.
    this.server.registerTool(
      "get_summary",
      {
        title: "Get summary",
        description: "Return the candidate's name, label, and professional summary.",
        inputSchema: {},
      },
      async () =>
        asText({
          name: resume.basics.name,
          label: resume.basics.label,
          summary: resume.basics.summary,
        }),
    );

    // TOOL: get_section - one enum-constrained section of the resume.
    this.server.registerTool(
      "get_section",
      {
        title: "Get section",
        description:
          "Return one section of the resume: work, education, skills, or projects.",
        inputSchema: {
          section: z.enum(["work", "education", "skills", "projects"]),
        },
      },
      async ({ section }) => asText((resume as Record<string, unknown>)[section]),
    );

    // TOOL: search_by_skill - the showcase tool. Reuses shared/search.ts.
    this.server.registerTool(
      "search_by_skill",
      {
        title: "Search by skill",
        description:
          "Find the work experiences and projects where a given skill or technology was used.",
        inputSchema: {
          skill: z.string().min(1).describe("e.g. 'Kafka', 'C#', 'RAG'"),
        },
      },
      async ({ skill }) => asText(searchBySkill(resume, skill)),
    );
  }
}
