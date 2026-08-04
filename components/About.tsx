import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about">
      <Reveal>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <p className="eyebrow">about</p>
          <h2 style={{ marginBottom: 20 }}>cat about.md</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.75 }}>
            I&apos;m a backend-leaning software engineer based in Bengaluru. Most
            recently I worked on payment infrastructure at Juspay — checkout
            flows, transaction state machines, provider integrations — the kind
            of systems where a bug means someone&apos;s money doesn&apos;t move
            correctly, so correctness and clear failure modes matter more than
            almost anything else.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.75 }}>
            Outside of paid work I build developer tools — things I&apos;d
            actually reach for myself, like MockEngine — and I&apos;m drawn to
            projects with real algorithmic depth over ones that just wire
            libraries together.
          </p>
        </div>
        <div className="win" style={{ alignSelf: "start" }}>
          <div className="win-bar">
            <span className="win-dot" style={{ background: "#e0605080" }} />
            <span className="win-dot" style={{ background: "#e0a95080" }} />
            <span className="win-dot" style={{ background: "#50c07880" }} />
            <span className="win-title">stack.json</span>
          </div>
          <div className="mono" style={{ padding: 20, fontSize: 13, lineHeight: 2 }}>
            <div><span style={{ color: "var(--violet)" }}>backend</span>: <span style={{ color: "var(--text-secondary)" }}>Java, Spring Boot, Python, FastAPI, Node.js</span></div>
            <div><span style={{ color: "var(--violet)" }}>data</span>: <span style={{ color: "var(--text-secondary)" }}>PostgreSQL, Redis, SQL</span></div>
            <div><span style={{ color: "var(--violet)" }}>frontend</span>: <span style={{ color: "var(--text-secondary)" }}>React, Next.js, TypeScript</span></div>
            <div><span style={{ color: "var(--violet)" }}>infra</span>: <span style={{ color: "var(--text-secondary)" }}>Docker, AWS, Nginx</span></div>
            <div><span style={{ color: "var(--violet)" }}>ai</span>: <span style={{ color: "var(--text-secondary)" }}>OpenAI API, Gemini API, LLMs</span></div>
          </div>
        </div>
      </div>
      </Reveal>
      <style>{`
        @media (max-width: 720px) {
          #about .wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}