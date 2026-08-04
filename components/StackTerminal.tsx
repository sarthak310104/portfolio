export default function StackTerminal({
  fileName,
  tags,
}: {
  fileName: string;
  tags: string[];
}) {
  return (
    <div className="win">
      <div className="win-bar">
        <span className="win-dot" style={{ background: "#e0605080" }} />
        <span className="win-dot" style={{ background: "#e0a95080" }} />
        <span className="win-dot" style={{ background: "#50c07880" }} />
        <span className="win-title">{fileName}</span>
      </div>
      <div className="mono" style={{ padding: 20, fontSize: 13.5 }}>
        <div style={{ color: "var(--text-secondary)", marginBottom: 10 }}>
          <span style={{ color: "var(--amber)" }}>$ </span>cat stack.txt
        </div>
        {tags.map((tag) => (
          <div key={tag} style={{ display: "flex", gap: 8, padding: "3px 0" }}>
            <span style={{ color: "var(--violet)" }}>-</span>
            <span style={{ color: "var(--text-primary)" }}>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}