const ROWS = [
  {
    pid: "0091",
    proc: "juspay/product-engineer",
    time: "08/2025–06/2026",
    status: "exited",
    detail:
      "Built a multi-method checkout flow and 6+ end-to-end transaction flows (3DS auth, refund, capture, webhook ingestion) across 3+ payment providers, raising processing throughput 70%.",
  },
  {
    pid: "0042",
    proc: "nxp/web-dev-intern",
    time: "07/2024–06/2025",
    status: "exited",
    detail:
      "Shipped 8+ internal full-stack tools including a lab inventory system handling 100K+ tools; grew adoption of an internal dev-tooling platform by 40%.",
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <p className="eyebrow">experience</p>
        <h2 style={{ marginBottom: 32 }}>ps aux --backend</h2>
        <div className="win">
          <div className="win-bar">
            <span className="win-dot" style={{ background: "#e0605080" }} />
            <span className="win-dot" style={{ background: "#e0a95080" }} />
            <span className="win-dot" style={{ background: "#50c07880" }} />
            <span className="win-title">work-history</span>
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
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    gridColumn: "1 / -1",
                  }}
                >
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
