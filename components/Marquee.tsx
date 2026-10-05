const ITEMS = [
  "python", "fastapi", "django", "java", "node.js", "postgresql", "timescaledb",
  "redis", "celery", "docker", "react", "next.js", "typescript", "aws", "opentelemetry",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-viewport mono">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-glyph">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}