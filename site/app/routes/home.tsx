import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Briefcase,
  Code2,
  Download,
  FileCode2,
  FileJson2,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import type { Route } from "./+types/home";
import { CopyButton } from "../components/CopyButton";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Surya Prakash Rao Kapila — Backend Engineer · Gen AI" },
    {
      name: "description",
      content:
        "Backend software engineer building production systems in C#, TypeScript and Kafka, and AI-native with Claude Code, RAG and agents. Resume also available as an MCP server.",
    },
  ];
}

const REPO_URL = "https://github.com/suryakapila";

// Illustrative Claude Desktop config for the stdio MCP server (server-local/).
const MCP_CONFIG = `{
  "mcpServers": {
    "resume": {
      "command": "node",
      "args": ["/path/to/server-local/dist/server-local/src/index.js"]
    }
  }
}`;

// Prompts to paste into your own Claude once the MCP server is connected.
const ASK_PROMPTS = [
  "Has Surya run Kafka in production, and what did he build with it?",
  "What does Surya actually own in his current role?",
  "What happened between 2020 and 2023?",
  "Would Surya be a good fit for a backend platform team?",
];

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
        {/* HERO — stacked */}
        <section className="hero">
          <p className="hero-kicker">
            Backend Engineer · Gen AI &amp; AI-Assisted Development · Hyderabad
          </p>
          <h1 className="hero-name">
            Surya Prakash <em>Rao</em> Kapila
          </h1>
          <p className="lead justify hero-lead">
            I build and run production backend systems — C# and SQL Server, Node and
            TypeScript, event-driven on Kafka — serving 40+ enterprise clients at
            100,000+ requests a day. And I build with AI natively: shipping on Claude
            Code, standing up RAG over a codebase, and writing Gen AI systems from a
            coding agent to a retrieval engine built from scratch.
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
              <div className="num stat-num">Gen AI</div>
              <div className="stat-label">RAG · agents · pipelines</div>
            </div>
          </div>
        </section>

        {/* Availability */}
        <div className="availability">
          <span className="dot" />
          <span>Currently open to SDE2/SDE3 roles — remote or Hyderabad</span>
          <a href="mailto:surya.kapila@gmail.com">surya.kapila@gmail.com</a>
        </div>

        {/* EXPERIENCE */}
        <section id="experience" className="section section--experience">
          <div className="section-head">
            <span className="num section-index">01</span>
            <h6>Experience</h6>
            <span className="rule" />
          </div>

          <article className="exp">
            <div className="num exp-meta">
              <div className="when">May 2025 — Present</div>
              <div>Hyderabad, India</div>
              <div className="role">Technical owner</div>
            </div>
            <div>
              <h3>Software Engineer</h3>
              <p className="exp-org">Cadient Talent</p>
              <ul className="exp-list">
                <li className="justify">
                  Primary technical owner of a backend platform serving 40+ enterprise
                  clients at over 100,000 requests per day — production support,
                  architecture and delivery after the team lead's departure.
                </li>
                <li className="justify">
                  Built a multi-tenant Node.js and TypeScript service for Job, Employee
                  and Location synchronisation — REST APIs, Zod, SQL Server and TypeORM,
                  with retry and reconciliation so partial failures never corrupt client
                  data.
                </li>
                <li className="justify">
                  Built internal engineering tooling on Claude Code plus a RAG index over
                  the codebase, cutting the time to trace a defect through unfamiliar code
                  and shortening onboarding for new joiners — AI applied as production
                  engineering, not a demo.
                </li>
                <li className="justify">
                  Design and run a C# service layer of SOAP and REST APIs over SQL Server,
                  owning correctness at the boundary: validating payloads in both
                  directions and absorbing upstream changes without client-facing
                  downtime.
                </li>
                <li className="justify">
                  Delivered 11 API integrations end to end in 14 months — requirements
                  through interface design, implementation and production rollout — across
                  job distribution, HRIS and background-screening partners.
                </li>
                <li className="justify">
                  Hold AI-generated changes to the same review bar as hand-written code:
                  PRs, peer review, CI/CD and MSTest coverage on every service before
                  merge.
                </li>
              </ul>
              <div className="tag-row">
                <span className="tag tag-outline">C# / .NET</span>
                <span className="tag tag-outline">WCF · ASMX · SOAP</span>
                <span className="tag tag-outline">SQL Server</span>
                <span className="tag tag-outline">TypeScript · TypeORM · Zod</span>
                <span className="tag tag-outline">MSTest</span>
              </div>
            </div>
          </article>

          <article className="exp">
            <div className="num exp-meta">
              <div className="when">Jul 2023 — Apr 2025</div>
              <div>Hyderabad, India</div>
            </div>
            <div>
              <h3>Software Engineer &amp; Consultant</h3>
              <p className="exp-org">CoSchool</p>
              <ul className="exp-list">
                <li className="justify">
                  Built production REST APIs and backend services in Node.js, NestJS and
                  TypeScript on an Agile team, applying object-oriented design and
                  established service patterns.
                </li>
                <li className="justify">
                  Designed an event-driven notification platform on Kafka, decoupling
                  distributed services through asynchronous messaging instead of
                  synchronous calls.
                </li>
                <li className="justify">
                  Cut database load 35% with Redis caching on hot read paths, and improved
                  backend response times roughly 20% through query optimisation and
                  service refactoring.
                </li>
                <li className="justify">
                  Deployed and validated services with Docker; used AWS CloudWatch for
                  observability across logs and metrics, triaging production and
                  pre-production issues.
                </li>
                <li className="justify">
                  Expanded automated regression coverage with Jest and Cucumber; covered
                  frontend delivery in React and Redux for six months during a resource
                  shortfall; mentored junior engineers through review and design sessions.
                </li>
              </ul>
              <div className="tag-row">
                <span className="tag tag-outline">Node.js · NestJS</span>
                <span className="tag tag-outline">Kafka</span>
                <span className="tag tag-outline">Redis</span>
                <span className="tag tag-outline">Docker · AWS</span>
                <span className="tag tag-outline">Jest · Cucumber</span>
              </div>
            </div>
          </article>

          <article className="exp exp--compact">
            <div className="num exp-meta" style={{ color: "var(--color-text)" }}>
              Mar 2020 — Jun 2023
            </div>
            <p className="justify exp-note">
              Career break — full-time preparation for the Indian Civil Services (UPSC)
              examination.
            </p>
          </article>

          <article className="exp exp--compact">
            <div className="num exp-meta">
              <div className="when">Jul 2018 — Feb 2020</div>
              <div>Karlsruhe, Germany</div>
            </div>
            <div>
              <h4>Automotive Test Engineer</h4>
              <p className="exp-org">Robert Bosch GmbH (via Hays)</p>
              <p className="justify exp-para">
                Validated automotive RADAR systems in C++ with the Vector toolchain in a
                safety-critical environment, working to formal test specifications and
                defect-tracking discipline.
              </p>
            </div>
          </article>

          <article className="exp">
            <div className="num exp-meta">
              <div className="when">Jun 2016 — Jun 2017</div>
              <div>Frankfurt am Main, Germany</div>
            </div>
            <div>
              <h4>Test Engineer, Freelance</h4>
              <p className="exp-org">Cint Consulting</p>
              <p className="justify exp-para">
                Hardware-in-the-loop testing of photovoltaic inverter systems in C++ using
                MATLAB/Simulink models and the Vector toolchain — validating controller
                behaviour against simulated grid and array conditions, and automating
                regression tests against formal specifications.
              </p>
            </div>
          </article>
        </section>

        {/* PROJECTS */}
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
            <div className="card">
              <div className="card-kicker">Retrieval · 01</div>
              <h3 className="card-title">RAG-Search-Engine</h3>
              <p className="card-body">
                A retrieval stack built from scratch — sparse ranking, dense retrieval, and
                their fusion — as the foundation for a full RAG system. Written to
                understand the tradeoffs rather than to wrap a library.
              </p>
              <div className="card-meta">
                <span>Python</span>
                <span>·</span>
                <span>BM25</span>
                <span>·</span>
                <span>embeddings</span>
                <span>·</span>
                <span>rank fusion</span>
              </div>
            </div>
            <div className="card">
              <div className="card-kicker">Agents · 02</div>
              <h3 className="card-title">Coding Agent</h3>
              <p className="card-body">
                Autonomous coding agent with tool orchestration, multi-step reasoning and a
                validation layer that checks generated code before it is applied. Modular
                by design, so new tools and model providers drop in.
              </p>
              <div className="card-meta">
                <span>Python</span>
                <span>·</span>
                <span>Gemini Flash</span>
                <span>·</span>
                <span>tool use</span>
              </div>
            </div>
            <div className="card">
              <div className="card-kicker">Pipelines · 03</div>
              <h3 className="card-title">AI Investment Pipeline</h3>
              <p className="card-body">
                Three-stage pipeline that sources startups, scores them against a versioned
                investment thesis and generates evidence-backed memos — structured outputs,
                caching, and run-level observability throughout.
              </p>
              <div className="card-meta">
                <span>TypeScript</span>
                <span>·</span>
                <span>Claude API</span>
                <span>·</span>
                <span>ChromaDB</span>
              </div>
            </div>
            <div className="card">
              <div className="card-kicker">Messaging · 04</div>
              <h3 className="card-title">RabbitMQ Pub/Sub Service</h3>
              <p className="card-body">
                Message-driven publish/subscribe service on RabbitMQ with typed message
                contracts and consumer workflows that scale horizontally.
              </p>
              <div className="card-meta">
                <span>TypeScript</span>
                <span>·</span>
                <span>RabbitMQ</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="section-head section-head--tight">
            <span className="num section-index">03</span>
            <h6>Skills</h6>
            <span className="rule" />
          </div>
          <div className="table-scroll">
            <table className="table skills-table">
              <tbody>
                <tr>
                  <th>Languages</th>
                  <td>C# · TypeScript · JavaScript · SQL · Python</td>
                </tr>
                <tr>
                  <th>Microsoft stack</th>
                  <td>
                    .NET Framework · WCF · ASMX · SQL Server · T-SQL · SOAP / XML web
                    services · IIS
                  </td>
                </tr>
                <tr>
                  <th>Backend</th>
                  <td>
                    Node.js · NestJS · Express.js · REST &amp; SOAP API design ·
                    microservices · systems integration
                  </td>
                </tr>
                <tr>
                  <th>Distributed systems</th>
                  <td>
                    Kafka · RabbitMQ · event-driven architecture · asynchronous processing
                  </td>
                </tr>
                <tr>
                  <th>Databases</th>
                  <td>SQL Server · PostgreSQL · MongoDB · Redis · TypeORM · Mongoose</td>
                </tr>
                <tr>
                  <th>Cloud &amp; DevOps</th>
                  <td>
                    AWS (EC2, S3, CloudWatch) · observability &amp; monitoring · Docker ·
                    GitHub Actions · Jenkins · CI/CD
                  </td>
                </tr>
                <tr>
                  <th>Testing &amp; security</th>
                  <td>
                    MSTest · Jest · Cucumber · unit &amp; integration testing · OAuth2 ·
                    JWT · RBAC · Zod · secure coding
                  </td>
                </tr>
                <tr>
                  <th>AI engineering</th>
                  <td>
                    Claude Code · Claude API / Anthropic SDK · Gemini Flash · RAG ·
                    ChromaDB · structured outputs · prompt engineering
                  </td>
                </tr>
                <tr>
                  <th>Frontend &amp; tools</th>
                  <td>React · Redux · Git · GitHub · Jira · Agile / Scrum</td>
                </tr>
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
                becomes callable — filter roles by technology, search every line, get
                contact details, all as structured JSON instead of prose.
              </p>
              <p className="justify mcp-p">
                It's a small server, and that's the point: it's the same shape as the
                integration work I do all day — a typed boundary, validated arguments,
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
                  href="/mcp-server/source"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-secondary"
                  data-icon
                >
                  <FileCode2 />
                  Server source
                </a>
                <a
                  href="/mcp-server/readme"
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
                className="justify mcp-p"
                style={{ marginTop: "var(--space-4)", fontSize: "14px" }}
              >
                Prefer a hosted endpoint? A Cloudflare Worker exposing the same server over
                HTTP MCP — so any remote client can connect without cloning anything — is on
                the roadmap.
              </p>
            </div>

            <div>
              <p className="mcp-side-label">Tools exposed</p>
              <div className="table-scroll">
                <table className="table mcp-table">
                  <tbody>
                    <tr>
                      <td className="tool">get_experience</td>
                      <td className="sig">company? · technology?</td>
                    </tr>
                    <tr>
                      <td className="tool">get_skills</td>
                      <td className="sig">category?</td>
                    </tr>
                    <tr>
                      <td className="tool">get_projects</td>
                      <td className="sig">keyword?</td>
                    </tr>
                    <tr>
                      <td className="tool">search_resume</td>
                      <td className="sig">query</td>
                    </tr>
                    <tr>
                      <td className="tool">years_of_experience</td>
                      <td className="sig">—</td>
                    </tr>
                    <tr>
                      <td className="tool">contact</td>
                      <td className="sig">—</td>
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
                    <tr>
                      <td className="tool">resume://summary</td>
                      <td className="sig">text/plain</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ask it — in your own Claude (no backend; the visitor's own model answers) */}
          <div className="chat">
            <div className="chat-head">
              <Sparkles />
              <span className="title">Ask it — in your own Claude</span>
              <span className="aside">no key, no backend</span>
            </div>
            <div className="chat-log">
              <div className="chat-empty">
                <p>
                  Connect the MCP server above, then ask your own Claude anything you'd
                  normally scan the resume for — depth on a technology, scale of a system,
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
                6 tools · 2 resources
              </span>
            </div>
          </div>
        </section>

        {/* EDUCATION & CONTACT */}
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
                  <tr>
                    <th className="edu-th">2012 — 2015</th>
                    <td>
                      <div className="edu-deg">
                        M.Sc. Electrical Engineering &amp; Information Technology
                      </div>
                      <div className="edu-inst">Hochschule Darmstadt, Germany</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="edu-th">2008 — 2012</th>
                    <td>
                      <div className="edu-deg">
                        B.Tech. Electrical &amp; Electronics Engineering
                      </div>
                      <div className="edu-inst">
                        Jawaharlal Nehru Technological University
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="contact-hed">
                Let's talk about <em>the boundary</em> of your system.
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
        <span>Surya Prakash Rao Kapila — Hyderabad, India</span>
        <span>Hand-built. Also available as an MCP server.</span>
      </footer>
    </div>
  );
}
