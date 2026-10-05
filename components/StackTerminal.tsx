import TiltCard from "./TiltCard";

export default function StackTerminal({
  fileName,
  tags,
}: {
  fileName: string;
  tags: string[];
}) {
  return (
    <TiltCard className="win">
      <div className="win-bar">
        <span className="win-dot" />
        <span className="win-dot" />
        <span className="win-dot" />
        <span className="win-title">{fileName}</span>
      </div>
      <div className="mono" style={{ padding: 20, fontSize: 13.5 }}>
        <div style={{ color: "var(--text-secondary)", marginBottom: 12 }}>
          <span style={{ color: "var(--amber)" }}>$ </span>cat stack.txt
        </div>
        <div className="stack-tags">
          {tags.map((tag, i) => (
            <span key={tag} className="stack-tag" style={{ animationDelay: `${i * 60}ms` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}