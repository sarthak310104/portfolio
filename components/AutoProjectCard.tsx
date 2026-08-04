import type { GithubRepo } from "@/lib/github";

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function AutoProjectCard({ repo }: { repo: GithubRepo }) {
  return (
    <div className="win" style={{ marginBottom: 28 }}>
      <div className="win-bar">
        <span className="win-dot" style={{ background: "#e0605080" }} />
        <span className="win-dot" style={{ background: "#e0a95080" }} />
        <span className="win-dot" style={{ background: "#50c07880" }} />
        <span className="win-title">{repo.name.toLowerCase()} — synced from github</span>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <h3 style={{ fontSize: 18 }}>{repo.name}</h3>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{ fontSize: 12, color: "var(--violet)", textDecoration: "none" }}
          >
            view source →
          </a>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "8px 0 12px" }}>
          {repo.description ?? "No description yet on GitHub — check the repo for details."}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {repo.language && <span className="tag mono">{repo.language}</span>}
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="tag mono">
              {t}
            </span>
          ))}
          <span className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>
            updated {timeAgo(repo.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}