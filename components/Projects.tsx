import MockEngineDemo from "./MockEngineDemo";
import Reveal from "./Reveal";
import StackTerminal from "./StackTerminal";
import { PROJECT_OVERRIDES } from "./projectOverrides";
import { getProjectRepos, type GithubRepo } from "@/lib/github";

function StatusTag({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "live" }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 11,
        padding: "3px 8px",
        borderRadius: 4,
        border: `1px solid ${tone === "live" ? "var(--live)" : "var(--border-strong)"}`,
        color: tone === "live" ? "var(--live)" : "var(--text-muted)",
        display: "inline-block",
        marginTop: 12,
      }}
    >
      {children}
    </span>
  );
}

function num(n: number) {
  return String(n).padStart(2, "0");
}

function TextCol({
  index,
  title,
  blurb,
  sourceUrl,
  status,
  demo,
}: {
  index: number;
  title: string;
  blurb: string;
  sourceUrl: string;
  status?: { label: string; tone: "muted" | "live" };
  demo?: boolean;
}) {
  return (
    <div>
      <span className="proj-index">{num(index)}</span>
      <h3 style={{ fontSize: 24, marginBottom: 14 }}>{title}</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: 14.5, lineHeight: 1.75, marginBottom: 8 }}>
        {blurb}
      </p>
      {status && <StatusTag tone={status.tone}>{status.label}</StatusTag>}
      <div style={{ marginTop: 16 }}>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mono"
          style={{ fontSize: 12, color: "var(--violet)", textDecoration: "none" }}
        >
          view source →
        </a>
      </div>
      {demo && (
        <div style={{ marginTop: 20 }}>
          <MockEngineDemo />
        </div>
      )}
    </div>
  );
}

export default async function Projects() {
  const repos = await getProjectRepos();

  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  const overridden = new Set(PROJECT_OVERRIDES.map((o) => o.matchName.toLowerCase()));
  const extras = repos.filter((r) => !overridden.has(r.name.toLowerCase()));

  let index = 0;

  return (
    <section id="projects">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">projects</p>
          <h2 style={{ marginBottom: 12 }}>ls -la ~/projects</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 620, marginBottom: 8 }}>
            Synced from GitHub — forks are filtered out automatically, and
            new pushes show up here on their own within the hour. The first
            two below are what I&apos;d point a hiring manager to; anything
            after that is earlier or rougher work, kept for context rather
            than polish.
          </p>
        </Reveal>

        {PROJECT_OVERRIDES.map((proj) => {
          const live = byName.get(proj.matchName.toLowerCase());
          index++;
          const flip = index % 2 === 0;
          const text = (
            <TextCol
              index={index}
              title={proj.title}
              blurb={proj.blurb}
              sourceUrl={live?.url ?? `https://github.com/sarthak310104/${proj.matchName}`}
              status={proj.status}
              demo={proj.demo === "mockengine"}
            />
          );
          const stack = <StackTerminal fileName={`${proj.matchName.toLowerCase()}/stack.txt`} tags={proj.tags} />;
          return (
            <div className={`proj-row${flip ? " reverse" : ""}`} key={proj.matchName}>
              <Reveal direction="left">{flip ? stack : text}</Reveal>
              <Reveal direction="right">{flip ? text : stack}</Reveal>
            </div>
          );
        })}

        {extras.map((repo: GithubRepo) => {
          index++;
          const flip = index % 2 === 0;
          const tags = repo.stackTags.length ? repo.stackTags : ["needs a stack.txt"];
          const text = (
            <TextCol
              index={index}
              title={repo.name}
              blurb={repo.description ?? "No description yet — check the repo for details."}
              sourceUrl={repo.url}
              status={{ label: "synced from github", tone: "muted" }}
            />
          );
          const stack = (
            <StackTerminal
              fileName={`${repo.name.toLowerCase()}/stack.txt`}
              tags={tags}
            />
          );
          return (
            <div className={`proj-row${flip ? " reverse" : ""}`} key={repo.name}>
              <Reveal direction="left">{flip ? stack : text}</Reveal>
              <Reveal direction="right">{flip ? text : stack}</Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}