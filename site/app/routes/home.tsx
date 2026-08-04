import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Briefcase,
  Code2,
  Download,
  FileCode2,
  FileJson2,
  Globe,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import type { Route } from "./+types/home";
import { CopyButton } from "../components/CopyButton";

// The whole visible resume renders from this single source (same file the MCP
// server and the /resume.json route read). Only the editorial voice below
// (hero, taglines) is hand-written.
import resumeData from "../../../resume.json";

type WorkItem = {
  name: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  keywords?: string[];
  highlights: string[];
};
type ProjectItem = { name: string; category?: string; keywords: string[]; description: string };
type SkillItem = { name: string; keywords: string[] };
type EducationItem = {
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
};
type Resume = {
  basics: { name: string; label: string; summary: string };
  work: WorkItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  education: EducationItem[];
};

const resume = resumeData as unknown as Resume;

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Surya Prakash Rao Kapila · Backend Engineer, AI-Native" },
    {
      name: "description",
      content:
        "Backend software engineer building production systems in C#, TypeScript and Kafka, and building natively with AI: Claude Code, RAG and agents. Resume also runs as an MCP server.",
    },
  ];
}

const REPO_URL = "https://github.com/suryakapila";
const REPO = "https://github.com/suryakapila/Resume-MCP";

// Illustrative Claude Desktop config for the stdio MCP server (server-local/).
const MCP_CONFIG = `{
  "mcpServers": {
    "resume": {
      "command": "node",
      "args": ["/path/to/server-local/dist/server-local/src/index.js"]
    }
  }
}`;

// The live hosted MCP endpoint (this same Worker serves it at /mcp).
const MCP_URL = "https://surya-resume-site.suryakapila.workers.dev/mcp";
const MCP_CLI = `claude mcp add --transport http resume ${MCP_URL}`;

// Prompts to paste into your own Claude once the MCP server is connected.
const ASK_PROMPTS = [
  "Has Surya run Kafka in production, and what did he build with it?",
  "What does Surya actually own in his current role?",
  "What happened between 2020 and 2023?",
  "Would Surya be a good fit for a backend platform team?",
];

// --- date helpers (en dash for ranges; never an em dash) --------------------
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ym(d: string): string {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}
const monthRange = (s: string, e: string) => `${ym(s)} – ${ym(e)}`;
const yearRange = (s: string, e: string) => `${s.split("-")[0]} – ${e.split("-")[0]}`;

export default function Home() {
  return (
    <div id="top">
      <header className="nav site-nav container">
        <a href="#top" className="nav-brand" style={{ textDecoration: "none" }}>
          Surya Kapila
        </a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#mcp">Resume MCP</a>
        <a href="#contact">Contact</a>
        <a
          href="/Surya-Kapila-Resume.pdf"
          download
          className="btn btn-primary"
          data-icon
          style={{ gap: "7px" }}
        >
          <Download />
          PDF
        </a>
      </header>

      <main className="container">
        {/* HERO - editorial (hand-written voice) */}
        <section className="hero">
          <p className="hero-kicker">Backend Engineer · AI-Native · Hyderabad</p>
          <h1 className="hero-name">
            Surya Prakash <em>Rao</em> Kapila
          </h1>
          <p className="lead justify hero-lead">
            I build production backend systems that hold up: C#, TypeScript, SQL Server,
            event-driven on Kafka, serving 40+ enterprise clients at 100,000+ requests a
            day. And I don't just use AI, I build with it. Claude Code in my daily
            workflow, a RAG index over a live codebase, and Gen AI systems written from
            scratch. I go deep, stay curious, and keep the backend ahead of where AI is
            heading.
          </p>
          <div className="stat-strip">
            <div className="stat">
              <div className="num stat-num">5+</div>
              <div className="stat-label">Years engineering</div>
            </div>
            <div className="stat">
              <div className="num stat-num">40+</div>
              <div className="stat-label">Enterprise clients</div>
            </div>
            <div className="stat">
              <div className="num stat-num">100k</div>
              <div className="stat-label">Requests / day</div>
            </div>
            <div className="stat">
              <div className="num stat-num">AI-Native</div>
              <div className="stat-label">RAG · agents · pipelines</div>
            </div>
          </div>
        </section>

        {/* Availability */}
        <div className="availability">
          <span className="dot" />
          <span>Open to SDE2/SDE3 roles, remote or Hyderabad</span>
          <a href="mailto:surya.kapila@gmail.com">surya.kapila@gmail.com</a>
        </div>

        {/* EXPERIENCE - from resume.json */}
        <section id="experience" className="section section--experience">
          <div className="section-head">
            <span className="num section-index">01</span>
            <h6>Experience</h6>
            <span className="rule" />
          </div>

          {resume.work.map((job) => {
            const hl = job.highlights ?? [];
            const isBreak = hl.length === 0;
            const compact = hl.length === 1;
            return (
              <article
                className={`exp${isBreak || compact ? " exp--compact" : ""}`}
                key={job.name + job.startDate}
              >
                <div className="num exp-meta">
                  <div className="when">{monthRange(job.startDate, job.endDate)}</div>
                  {job.location ? <div>{job.location}</div> : null}
                </div>

                {isBreak ? (
                  <p className="justify exp-note">
                    Career break: {job.position.charAt(0).toLowerCase() + job.position.slice(1)}.
                  </p>
                ) : (
                  <div>
                    {compact ? <h4>{job.position}</h4> : <h3>{job.position}</h3>}
                    <p className="exp-org">{job.name}</p>
                    {compact ? (
                      <p className="justify exp-para">{hl[0]}</p>
                    ) : (
                      <ul className="exp-list">
                        {hl.map((h, i) => (
                          <li className="justify" key={i}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {job.keywords?.length ? (
                      <div className="tag-row">
                        {job.keywords.map((k) => (
                          <span className="tag tag-outline" key={k}>
                            {k}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* PROJECTS - from resume.json */}
        <section id="projects" className="section">
          <div className="section-head">
            <span className="num section-index">02</span>
            <h6>Selected projects</h6>
            <span className="rule" />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener"
              className="section-link"
              data-icon
            >
              github.com/suryakapila
              <ArrowUpRight />
            </a>
          </div>
          <div className="projects-grid">
            {resume.projects.map((p, i) => (
              <div className="card" key={p.name}>
                <div className="card-kicker">
                  {p.category ?? "Project"} · {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="card-title">{p.name}</h3>
                <p className="card-body">{p.description}</p>
                <div className="card-meta">{p.keywords.join(" · ")}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS - from resume.json */}
        <section id="skills" className="section">
          <div className="section-head section-head--tight">
            <span className="num section-index">03</span>
            <h6>Skills</h6>
            <span className="rule" />
          </div>
          <div className="table-scroll">
            <table className="table skills-table">
              <tbody>
                {resume.skills.map((s) => (
                  <tr key={s.name}>
                    <th>{s.name}</th>
                    <td>{s.keywords.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* RESUME MCP */}
        <section id="mcp" className="section">
          <div className="section-head">
            <span className="num section-index">04</span>
            <h6>Resume MCP</h6>
            <span className="rule" />
          </div>

          <div className="mcp-grid">
            <div>
              <h2 className="mcp-hed">
                Don't read the PDF. <em>Query it.</em>
              </h2>
              <p className="justify mcp-p">
                This resume also ships as a Model Context Protocol server. Point Claude
                Desktop, Claude Code or your own agent at it and the whole work history
                becomes callable: filter roles by technology, search every line, get
                contact details, all as structured JSON instead of prose.
              </p>
              <p className="justify mcp-p">
                It's a small server, and that's the point. It's the same shape as the
                backend systems I build every day: a typed boundary, validated arguments,
                predictable payloads.
              </p>

              <div className="code-card">
                <div className="code-card-head">
                  <FileJson2 />
                  <span>claude_desktop_config.json</span>
                </div>
                <pre>
                  {"{\n  "}
                  <span className="k">"mcpServers"</span>
                  {": {\n    "}
                  <span className="k">"resume"</span>
                  {": {\n      "}
                  <span className="k">"command"</span>: <span className="s">"node"</span>
                  {",\n      "}
                  <span className="k">"args"</span>: [
                  <span className="s">
                    "/path/to/server-local/dist/server-local/src/index.js"
                  </span>
                  ]{"\n    }\n  }\n}"}
                </pre>
              </div>
              <div className="mcp-actions">
                <CopyButton value={MCP_CONFIG} label="Copy config" />
                <a
                  href={`${REPO}/blob/main/server-local/src/index.ts`}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-secondary"
                  data-icon
                >
                  <FileCode2 />
                  Server source
                </a>
                <a
                  href={`${REPO}#readme`}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-secondary"
                  data-icon
                >
                  <BookOpen />
                  Readme
                </a>
                <a
                  href="/resume.json"
                  target="_blank"
                  className="btn btn-secondary"
                  data-icon
                >
                  <Braces />
                  resume.json
                </a>
              </div>
              <p
                className="mcp-side-label"
                style={{ marginTop: "var(--space-6)" }}
              >
                Or connect over HTTP (no clone, no key)
              </p>
              <div className="code-card">
                <div className="code-card-head">
                  <Globe />
                  <span>hosted endpoint · Streamable HTTP</span>
                </div>
                <pre>{MCP_URL}</pre>
              </div>
              <div className="mcp-actions">
                <CopyButton value={MCP_URL} label="Copy URL" />
                <CopyButton value={MCP_CLI} label="Copy Claude Code command" />
              </div>
              <p className="justify mcp-p" style={{ fontSize: "14px" }}>
                In Claude (Desktop or web): Settings, then Connectors, then Add custom
                connector, and paste the URL. In Claude Code: run the command above. Any
                Streamable HTTP MCP client works.
              </p>
            </div>

            <div>
              <p className="mcp-side-label">Tools exposed</p>
              <div className="table-scroll">
                <table className="table mcp-table">
                  <tbody>
                    <tr>
                      <td className="tool">get_summary</td>
                      <td className="sig">name, label, summary</td>
                    </tr>
                    <tr>
                      <td className="tool">get_section</td>
                      <td className="sig">work | education | skills | projects</td>
                    </tr>
                    <tr>
                      <td className="tool">search_by_skill</td>
                      <td className="sig">skill</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mcp-side-label mcp-side-label--spaced">Resources</p>
              <div className="table-scroll">
                <table className="table mcp-table">
                  <tbody>
                    <tr>
                      <td className="tool">resume://full</td>
                      <td className="sig">application/json</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ask it - in your own Claude (no backend; the visitor's own model answers) */}
          <div className="chat">
            <div className="chat-head">
              <Sparkles />
              <span className="title">Ask it in your own Claude</span>
              <span className="aside">no key, no backend</span>
            </div>
            <div className="chat-log">
              <div className="chat-empty">
                <p>
                  Connect the MCP server above, then ask your own Claude anything you'd
                  normally scan the resume for: depth on a technology, scale of a system,
                  why the career break. Copy a prompt to get started.
                </p>
                <div className="chat-presets">
                  {ASK_PROMPTS.map((q) => (
                    <CopyButton key={q} value={q} label={q} className="btn chat-preset" />
                  ))}
                </div>
              </div>
            </div>
            <div className="chat-form" style={{ justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", color: "rgba(243,242,242,0.5)" }}>
                Answers come from your model, grounded in this resume over MCP.
              </span>
              <span style={{ fontSize: "13px", color: "var(--color-accent-400)" }}>
                3 tools · 1 resource
              </span>
            </div>
          </div>
        </section>

        {/* EDUCATION & CONTACT - education from resume.json */}
        <section id="contact" className="section">
          <div className="section-head section-head--tight">
            <span className="num section-index">05</span>
            <h6>Education &amp; contact</h6>
            <span className="rule" />
          </div>
          <div className="contact-grid">
            <div>
              <table className="table num">
                <tbody>
                  {resume.education.map((e) => (
                    <tr key={e.institution}>
                      <th className="edu-th">{yearRange(e.startDate, e.endDate)}</th>
                      <td>
                        <div className="edu-deg">
                          {e.studyType} {e.area}
                        </div>
                        <div className="edu-inst">{e.institution}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="contact-hed">
                Let's build the backend for <em>what's next</em>.
              </h3>
              <div className="contact-links">
                <a href="mailto:surya.kapila@gmail.com" className="contact-link" data-icon>
                  <Mail />
                  <span className="label">Email</span>
                  <span>surya.kapila@gmail.com</span>
                </a>
                <a href="tel:+916281505746" className="contact-link" data-icon>
                  <Phone />
                  <span className="label">Phone</span>
                  <span className="num">+91 62815 05746</span>
                </a>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener"
                  className="contact-link"
                  data-icon
                >
                  <Code2 />
                  <span className="label">GitHub</span>
                  <span>github.com/suryakapila</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/surya-prakash-rao-k-2941b75b/"
                  target="_blank"
                  rel="noopener"
                  className="contact-link"
                  data-icon
                >
                  <Briefcase />
                  <span className="label">LinkedIn</span>
                  <span>surya-prakash-rao-k</span>
                </a>
                <a
                  href="/Surya-Kapila-Resume.pdf"
                  download
                  className="contact-link"
                  data-icon
                >
                  <Download />
                  <span className="label">Resume</span>
                  <span>Surya-Kapila-Resume.pdf</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Surya Prakash Rao Kapila · Hyderabad, India</span>
        <span>Hand-built. Also available as an MCP server.</span>
      </footer>
    </div>
  );
}
