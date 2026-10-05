const ROWS = [
  {
    pid: "0091",
    proc: "juspay/product-engineer",
    time: "08/2025–06/2026",
    status: "exited",
    bullets: [
      "Built Google Wallet and Apple Pay support into a merchant checkout screen as part of a multi-payment-method redesign, making the implementation config-driven across merchants.",
      "Owned 6+ transaction flows end to end, including initiation, 3DS authentication, refunds, captures, and webhook ingestion, across 3+ payment providers, building APIs and business logic for payment processing.",
      "Worked with the platform team to optimize backend modules in the payment flow's critical path, reducing redundant processing and improving load times and overall application performance by 15%.",
      "Built an MCP-based personalization tool that uses an LLM to fetch a prospective merchant's brand colors, logo, and currency and apply them to demo checkout configurations.",
    ],
  },
  {
    pid: "0042",
    proc: "nxp/web-dev-intern",
    time: "07/2024–06/2025",
    status: "exited",
    bullets: [
      "Built 8+ internal tools using Java, JSP, and SQL, replacing manual workflows across multiple teams and working directly with stakeholders to define requirements.",
      "Designed a lab inventory and booking system for tracking and reserving 100K+ tools in real time, adding database indexes for fast availability lookups and logic to prevent double-booking.",
      "Reworked core workflows on an internal dev tooling platform, fixing reliability issues that had been blocking adoption, and grew usage by 40%.",
    ],
  },
];

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  return (
    <section id="experience">
      <Reveal>
      <div className="wrap">
        <SectionHead index="02" eyebrow="experience" title="ps aux --work" />
        <div className="win exp-win">
          <div className="win-bar">
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-title">work-history</span>
            <span className="holo-tag mono" style={{ marginLeft: "auto" }}>2 PROCESSES</span>
          </div>
          <div style={{ padding: "8px 0" }}>
            <div
              className="mono"
              style={{
                display: "grid",
                gridTemplateColumns: "70px 1fr 150px 90px",
                fontSize: 11,
                color: "var(--text-muted)",
                padding: "10px 20px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span>PID</span>
              <span>PROCESS</span>
              <span>TIME</span>
              <span>STATUS</span>
            </div>
            {ROWS.map((r) => (
              <div key={r.pid} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                <div
                  className="mono"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr 150px 90px",
                    fontSize: 13,
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>{r.pid}</span>
                  <span style={{ color: "var(--text-primary)" }}>{r.proc}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{r.time}</span>
                  <span style={{ color: "var(--text-muted)" }}>{r.status}</span>
                </div>
                <ul className="exp-bullets">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  );
}