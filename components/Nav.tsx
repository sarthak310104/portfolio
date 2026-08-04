"use client";

const links = [
  { href: "#about", label: "--about" },
  { href: "#experience", label: "--experience" },
  { href: "#projects", label: "--projects" },
  { href: "#contact", label: "--contact" },
];

export default function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(10, 12, 16, 0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="wrap mono"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          fontSize: 13,
        }}
      >
        <a href="#top" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
          sarthak<span style={{ color: "var(--amber)" }}>@</span>portfolio
          <span style={{ color: "var(--text-muted)" }}>:~$</span>
        </a>
        <nav style={{ display: "flex", gap: 20 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: "var(--text-secondary)", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
