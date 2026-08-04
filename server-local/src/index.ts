import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { searchBySkill } from "../../shared/search.js";

// ---------------------------------------------------------------------------
// Load the resume once at startup. resume.json lives at the project root, one
// level up from this file's directory (dist/ or src/), so we resolve relative
// to the module's own location rather than the process working directory,
// which is set by whoever launches us (Claude Desktop) and can't be trusted.
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const resumePath = join(__dirname, "..", "..", "..", "resume.json");
const resume = JSON.parse(readFileSync(resumePath, "utf-8"));

// IMPORTANT: in a stdio server, stdout is the protocol channel. Never
// console.log — it corrupts the JSON-RPC stream. Use console.error (stderr).
console.error(`[resume-mcp] loaded resume for ${resume.basics?.name}`);

const server = new McpServer({
  name: "resume-mcp",
  version: "1.0.0",
});

// ---------------------------------------------------------------------------
// RESOURCE: the whole resume as one readable document.
// A resource is passive data addressed by a URI. No arguments.
// ---------------------------------------------------------------------------
server.registerResource(
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
  })
);

// small helper: wrap any JS value as a text tool-result
const asText = (value: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
});

// ---------------------------------------------------------------------------
// TOOL 1: get_summary — zero-argument tool. Returns the headline pitch.
// ---------------------------------------------------------------------------
server.registerTool(
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
    })
);

// ---------------------------------------------------------------------------
// TOOL 2: get_section — one argument, constrained to valid section names.
// ---------------------------------------------------------------------------
server.registerTool(
  "get_section",
  {
    title: "Get section",
    description:
      "Return one section of the resume: work, education, skills, or projects.",
    inputSchema: {
      section: z.enum(["work", "education", "skills", "projects"]),
    },
  },
  async ({ section }) => asText(resume[section])
);

// ---------------------------------------------------------------------------
// TOOL 3: search_by_skill — the showcase tool. Given a technology, find the
// jobs and projects that mention it. Case-insensitive substring match across
// job highlights and project keywords/descriptions.
// ---------------------------------------------------------------------------
server.registerTool(
  "search_by_skill",
  {
    title: "Search by skill",
    description:
      "Find the work experiences and projects where a given skill or technology was used.",
    inputSchema: {
      skill: z.string().min(1).describe("e.g. 'Kafka', 'C#', 'RAG'"),
    },
  },
  async ({ skill }) => asText(searchBySkill(resume, skill))
);

// ---------------------------------------------------------------------------
// Connect to the stdio transport and start listening.
// ---------------------------------------------------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[resume-mcp] server running on stdio");
}

main().catch((err) => {
  console.error("[resume-mcp] fatal:", err);
  process.exit(1);
});