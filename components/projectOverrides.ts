export type ProjectOverride = {
  matchName: string; // exact GitHub repo name, case-insensitive
  windowTitle: string;
  title: string;
  blurb: string;
  tags: string[];
  status?: { label: string; tone: "muted" | "live" };
  demo?: "mockengine";
};

// Ordered by how you'd want a visitor to see them. Anything on GitHub that
// isn't listed here still shows up automatically, using GitHub's own repo
// description as a fallback card further down the section.
export const PROJECT_OVERRIDES: ProjectOverride[] = [
  {
    matchName: "MockEngine",
    windowTitle: "mockengine — sandbox",
    title: "MockEngine",
    blurb:
      "Built this after one too many frontend sprints stalled on a backend endpoint that wasn't ready yet. Instead of a static mock JSON file, MockEngine actually evaluates requests — query params, headers, path params, body — against a rule set and routes to a matching response, so the mock behaves like the real service will.",
    tags: ["Node.js", "Express", "TypeScript", "React", "Docker"],
    demo: "mockengine",
  },
  {
    matchName: "Voyage",
    windowTitle: "voyage — services",
    title: "Voyage",
    blurb:
      "An AI travel planner, but the interesting part is underneath: three services (Next.js, Spring Boot, FastAPI) talking to each other behind an Nginx proxy instead of one monolith doing everything. The Spring Boot side owns auth, itineraries, and collaborator access; FastAPI owns the AI assistant, which calls two LLM providers and falls back to a mock response if both are down rather than showing the user an error.",
    tags: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker"],
  },
  {
    matchName: "resume-screening-platform",
    windowTitle: "resume-screening-platform — archive",
    title: "Resume screening platform",
    blurb:
      "An earlier project — parsing resumes and scoring them against a job description automatically. It's undocumented and unpolished compared to the two above, which is honestly why it's not on my resume, but it's where I first worked through a full backend + matching pipeline end to end.",
    tags: ["Python", "TypeScript"],
    status: { label: "work in progress, no README yet", tone: "muted" },
  },
  {
    matchName: "Blockchain-Based-Certification-using-IPFS",
    windowTitle: "blockchain-certification — archive",
    title: "Blockchain-based certification",
    blurb:
      "A college project on issuing and verifying certificates on-chain, with the certificate files themselves kept on IPFS instead of the chain, so only a hash needs to live on-chain. Included here for the same reason as the one above — earlier work, not polished, but part of how I got here.",
    tags: ["Blockchain", "IPFS", "HTML/CSS"],
    status: { label: "college project", tone: "muted" },
  },
];