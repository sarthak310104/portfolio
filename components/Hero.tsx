import Terminal from "./Terminal";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy fade-up-stagger">
          <div className="hud-chip mono" style={{ animationDelay: "0ms" }}>
            <span className="live-dot" /> OPEN TO WORK // BLR-IN
          </div>
          <h1 className="hero-title" style={{ animationDelay: "90ms" }}>
            I build the parts
            <br />
            of the system that
            <br />
            <span className="grad-text glitch" data-text="aren't supposed to break.">
              aren&apos;t supposed to break.
            </span>
          </h1>
          <p className="hero-sub" style={{ animationDelay: "180ms" }}>
            Software engineer, previously on payments at Juspay. Right now I&apos;m
            building Ghost Protocol, a behavioral digital twin that watches how
            production systems actually behave. The terminal below is real; try typing into it.
          </p>
          <div className="hero-cta" style={{ animationDelay: "270ms" }}>
            <a href="#project-ghost-protocol-emp" className="btn btn-primary">
              <span>launch ghost protocol</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              open a channel
            </a>
          </div>
          <div className="hero-stats mono" style={{ animationDelay: "360ms" }}>
            <div>
              <b>23k</b>
              <span>spans/sec ingested</span>
            </div>
            <div>
              <b>&lt;14ms</b>
              <span>p95 api reads</span>
            </div>
            <div>
              <b>1y</b>
              <span>in production payments</span>
            </div>
          </div>
        </div>

        {/* the 3D core renders behind this column; these are just HUD labels over it */}
        <div className="hero-hud mono" aria-hidden="true">
          <div className="reticle" />
          <span className="hud-label l1">CORE.SYS // v2026.10</span>
          <span className="hud-label l2">ORBIT 03 · STABLE</span>
          <span className="hud-label l3">LAT 12.97 N · LON 77.59 E</span>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 56 }}>
        <Terminal />
      </div>
      <div style={{ marginTop: 72 }}>
        <Marquee />
      </div>
    </section>
  );
}