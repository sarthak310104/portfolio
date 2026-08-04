const ITEMS = [
  "java", "spring boot", "python", "fastapi", "node.js", "postgresql",
  "redis", "docker", "react", "next.js", "typescript", "aws",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="marquee-viewport mono"
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "12px 0",
      }}
    >
      <div className="marquee-track" style={{ gap: 40 }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--amber)" }}>#</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}