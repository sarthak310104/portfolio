const LINKS = [
  { label: "email", value: "sarthak.painuli3101@gmail.com", href: "mailto:sarthak.painuli3101@gmail.com" },
  { label: "linkedin", value: "linkedin.com/in/sarthak-painuli", href: "https://linkedin.com/in/sarthak-painuli" },
  { label: "github", value: "github.com/sarthak310104", href: "https://github.com/sarthak310104" },
  { label: "leetcode", value: "leetcode.com/u/sarthak310104", href: "https://leetcode.com/u/sarthak310104" },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <p className="eyebrow">contact</p>
        <h2 style={{ marginBottom: 32 }}>mail --compose</h2>
        <div className="win" style={{ maxWidth: 560 }}>
          <div className="win-bar">
            <span className="win-dot" style={{ background: "#e0605080" }} />
            <span className="win-dot" style={{ background: "#e0a95080" }} />
            <span className="win-dot" style={{ background: "#50c07880" }} />
            <span className="win-title">reach-out</span>
          </div>
          <div style={{ padding: 24 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 20px" }}>
              Open to backend and API-focused roles. The fastest way to reach me
              is email.
            </p>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="mono"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderTop: "1px solid var(--border)",
                  fontSize: 13,
                  textDecoration: "none",
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{l.label}</span>
                <span style={{ color: "var(--amber)" }}>{l.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
