export type ProjectOverride = {
  matchName: string; // exact GitHub repo name, case-insensitive
  windowTitle: string;
  title: string;
  blurb: string;
  tags: string[];
  highlights?: string[];
  status?: { label: string; tone: "muted" | "live" };
  demo?: "mockengine" | "ghostgraph";
  demoUrl?: string; // set this once a live demo URL is stable
};

// Ordered by how you'd want a visitor to see them. Anything on GitHub that
// isn't listed here still shows up automatically, using GitHub's own repo
// description as a fallback card further down the section.
export const PROJECT_OVERRIDES: ProjectOverride[] = [
  {
    matchName: "Ghost-Protocol-emp",
    windowTitle: "ghost-protocol: behavioral twin",
    title: "Ghost Protocol",
    blurb:
      "A self-hosted behavioral digital twin for a company's production system. Point an existing OpenTelemetry collector at it and it builds a live graph of how services actually call each other, learns per-edge baselines, flags anomalies, correlates them into incidents, and runs continuous structural risk analysis (fan-in, critical path, saturation proximity) to surface bottlenecks before they turn into outages.",
    highlights: [
      "11k to 23k spans/sec ingestion, API reads under 14ms p95 on a 50-service topology",
      "benchmarking exposed a silent Postgres deadlock under concurrent load; fixed with ordered row locking plus a savepoint retry",
      "mean-reversion and concurrent-cohort simulation to test whether a fix actually moved the metric",
      "11-page Next.js dashboard with session auth and workspace isolation, backed by CI with 78 automated tests",
    ],
    tags: ["FastAPI", "AsyncIO", "PostgreSQL", "TimescaleDB", "Redis", "Celery", "Next.js", "TypeScript", "Docker"],
    status: { label: "shipped", tone: "live" },
    demo: "ghostgraph",
    demoUrl: "https://ghost-protocol-emp.vercel.app",
  },
  {
    matchName: "MockEngine",
    windowTitle: "mockengine: sandbox",
    title: "MockEngine",
    blurb:
      "Built this after one too many frontend sprints stalled on a backend endpoint that wasn't ready yet. Instead of a static mock JSON file, MockEngine actually evaluates requests (query params, headers, path params, body) against a rule set and routes to a matching response, so the mock behaves like the real service will.",
    tags: ["Node.js", "Express", "TypeScript", "React", "Docker"],
    demo: "mockengine",
  },
  {
    matchName: "Voyage",
    windowTitle: "voyage: services",
    title: "Voyage",
    blurb:
      "An AI travel planner, but the interesting part is underneath: three services (Next.js, Spring Boot, FastAPI) talking to each other behind an Nginx proxy instead of one monolith doing everything. The Spring Boot side owns auth, itineraries, and collaborator access; FastAPI owns the AI assistant, which calls two LLM providers and falls back to a mock response if both are down rather than showing the user an error.",
    tags: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker"],
  },
  {
    matchName: "resume-screening-platform",
    windowTitle: "resume-screening-platform: archive",
    title: "Resume screening platform",
    blurb:
      "An earlier project: parsing resumes and scoring them against a job description automatically. It's rougher than the ones above, but it's where I first worked through a full backend and matching pipeline end to end.",
    tags: ["Python", "TypeScript"],
    status: { label: "archive", tone: "muted" },
  },
  {
    matchName: "Blockchain-Based-Certification-using-IPFS",
    windowTitle: "blockchain-certification: archive",
    title: "Blockchain-based certification",
    blurb:
      "A college project on issuing and verifying certificates on-chain, with the certificate files themselves kept on IPFS so only a hash needs to live on-chain. Earlier work, kept for context.",
    tags: ["Blockchain", "IPFS", "HTML/CSS"],
    status: { label: "college project", tone: "muted" },
  },
];