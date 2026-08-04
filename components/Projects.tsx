import MockEngineDemo from "./MockEngineDemo";

function TagList({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0 0" }}>
      {tags.map((t) => (
        <span key={t} className="tag mono">
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <p className="eyebrow">projects</p>
        <h2 style={{ marginBottom: 32 }}>ls -la ~/projects</h2>

        <div className="win" style={{ marginBottom: 28 }}>
          <div className="win-bar">
            <span className="win-dot" style={{ background: "#e0605080" }} />
            <span className="win-dot" style={{ background: "#e0a95080" }} />
            <span className="win-dot" style={{ background: "#50c07880" }} />
            <span className="win-title">mockengine — sandbox</span>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 18 }}>MockEngine</h3>
              <a
                href="https://github.com/sarthak310104/MockEngine"
                target="_blank"
                rel="noreferrer"
                className="mono"
                style={{ fontSize: 12, color: "var(--violet)", textDecoration: "none" }}
              >
                view source →
              </a>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "8px 0 20px" }}>
              Self-hosted API mocking platform — a configurable rule engine matches
              requests on query params, headers, path params, and body to return
              production-like responses without a real backend.
            </p>
            <MockEngineDemo />
            <TagList tags={["Node.js", "Express", "TypeScript", "React", "Docker"]} />
          </div>
        </div>

        <div className="win">
          <div className="win-bar">
            <span className="win-dot" style={{ background: "#e0605080" }} />
            <span className="win-dot" style={{ background: "#e0a95080" }} />
            <span className="win-dot" style={{ background: "#50c07880" }} />
            <span className="win-title">voyage — services</span>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 18 }}>Voyage</h3>
              <a
                href="https://github.com/sarthak310104/Voyage"
                target="_blank"
                rel="noreferrer"
                className="mono"
                style={{ fontSize: 12, color: "var(--violet)", textDecoration: "none" }}
              >
                view source →
              </a>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "8px 0 4px" }}>
              AI travel-planning platform across a 3-service microservice
              architecture (Next.js, Spring Boot, FastAPI) behind an Nginx reverse
              proxy — collaborative itineraries, route optimization, and an AI
              travel assistant integrating two LLM providers with automatic
              fallback.
            </p>
            <TagList tags={["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
