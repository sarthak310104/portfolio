import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TiltCard from "./TiltCard";

const STACK = [
  { k: "backend", v: "Python, FastAPI, Django, Flask, Java, Node.js" },
  { k: "data", v: "PostgreSQL, VectorDB, TimescaleDB, MongoDB, Redis, SQL" },
  { k: "frontend", v: "React, Next.js, TypeScript" },
  { k: "infra", v: "Docker, AWS, Nginx, GitHub Actions" },
  { k: "ai", v: "MCP, RAG, LLM Integration, Prompt Engineering, Token Optimization" },
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal>
          <SectionHead index="01" eyebrow="about" title="cat about.md" />
        </Reveal>
        <div className="about-grid">
          <Reveal direction="left">
            <TiltCard className="id-card hud">
              <span className="hud-c tl" />
              <span className="hud-c tr" />
              <span className="hud-c bl" />
              <span className="hud-c br" />
              <div className="id-photo">
                <Image src="/sarthak.jpg" alt="Sarthak Painuli" width={460} height={570} priority />
              </div>
              <div className="id-meta mono">
                <div>
                  <span>ID</span> SP-3101
                </div>
                <div>
                  <span>CLASS</span> software engineer
                </div>
                <div>
                  <span>BASE</span> bengaluru, in
                </div>
                <div>
                  <span>STATUS</span> <em>available</em>
                </div>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal direction="right">
            <div>
              <p className="body-copy">
                I&apos;m a software engineer based in Bengaluru with a backend lean.
                At Juspay I worked on payment checkout flows, including Google Wallet
                and Apple Pay screens: the kind of system where a bug means
                someone&apos;s money doesn&apos;t move correctly, so correctness and clear
                failure modes matter more than almost anything else.
              </p>
              <p className="body-copy">
                Outside of paid work I build systems I&apos;d actually reach for myself.
                The biggest one is Ghost Protocol, an observability platform that models
                a company&apos;s services as a live behavioral graph. I&apos;m drawn to
                projects with real algorithmic depth over ones that just wire libraries
                together.
              </p>
              <div className="win" style={{ marginTop: 28 }}>
                <div className="win-bar">
                  <span className="win-dot" />
                  <span className="win-dot" />
                  <span className="win-dot" />
                  <span className="win-title">stack.json</span>
                </div>
                <div className="mono" style={{ padding: 20, fontSize: 13, lineHeight: 2 }}>
                  {STACK.map((s) => (
                    <div key={s.k}>
                      <span style={{ color: "var(--violet)" }}>{s.k}</span>:{" "}
                      <span style={{ color: "var(--text-secondary)" }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}