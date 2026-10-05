import MockEngineDemo from "./MockEngineDemo";
import GhostGraphDemo from "./GhostGraphDemo";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import StackTerminal from "./StackTerminal";
import { PROJECT_OVERRIDES, type ProjectOverride } from "./projectOverrides";
import { getProjectRepos, type GithubRepo } from "@/lib/github";

function StatusTag({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "live" }) {
  return <span className={`status-tag mono ${tone}`}>{children}</span>;
}

function num(n: number) {
  return String(n).padStart(2, "0");
}

function slug(name: string) {
  return `project-${name.toLowerCase()}`;
}

function Links({ sourceUrl, demoUrl }: { sourceUrl: string; demoUrl?: string }) {
  return (
    <div className="proj-links mono">
      <a href={sourceUrl} target="_blank" rel="noreferrer">
        view source ↗
      </a>
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noreferrer">
          live demo ↗
        </a>
      )}
    </div>
  );
}

function TextCol({
  index,
  title,
  blurb,
  sourceUrl,
  status,
  demo,
  demoUrl,
  highlights,
}: {
  index: number;
  title: string;
  blurb: string;
  sourceUrl: string;
  status?: { label: string; tone: "muted" | "live" };
  demo?: ProjectOverride["demo"];
  demoUrl?: string;
  highlights?: string[];
}) {
  return (
    <div>
      <span className="proj-index mono">{num(index)} //</span>
      <h3 className="proj-title">{title}</h3>
      {status && <StatusTag tone={status.tone}>{status.label}</StatusTag>}
      <p className="body-copy" style={{ marginTop: 14 }}>
        {blurb}
      </p>
      {highlights && (
        <ul className="proj-highlights">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <Links sourceUrl={sourceUrl} demoUrl={demoUrl} />
      {demo === "mockengine" && (
        <div style={{ marginTop: 22 }}>
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

  const [featured, ...rest] = PROJECT_OVERRIDES;
  const featuredUrl = byName.get(featured.matchName.toLowerCase())?.url ?? `https://github.com/sarthak310104/${featured.matchName}`;

  let index = 1;

  return (
    <section id="projects">
      <div className="wrap">
        <Reveal>
          <SectionHead index="03" eyebrow="projects" title="ls -la ~/projects">
            <p className="body-copy" style={{ maxWidth: 640, marginTop: 12 }}>
              Synced from GitHub: forks are filtered out and new pushes show up here on
              their own within the hour. Ghost Protocol is the one I&apos;d point a
              hiring manager to first.
            </p>
          </SectionHead>
        </Reveal>

        {/* flagship */}
        <Reveal>
          <article id={slug(featured.matchName)} className="featured hud">
            <span className="hud-c tl" />
            <span className="hud-c tr" />
            <span className="hud-c bl" />
            <span className="hud-c br" />
            <div className="featured-bar mono">
              <span className="holo-tag">[ FLAGSHIP ]</span>
              <span>{featured.windowTitle}</span>
            </div>
            <div className="featured-grid">
              <TextCol
                index={index}
                title={featured.title}
                blurb={featured.blurb}
                sourceUrl={featuredUrl}
                status={featured.status}
                demoUrl={featured.demoUrl}
                highlights={featured.highlights}
              />
              <div className="featured-side">
                {featured.demo === "ghostgraph" && <GhostGraphDemo />}
                <div className="stack-tags" style={{ marginTop: 18 }}>
                  {featured.tags.map((t) => (
                    <span key={t} className="stack-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {rest.map((proj) => {
          const live = byName.get(proj.matchName.toLowerCase());
          index++;
          const flip = index % 2 === 1;
          const text = (
            <TextCol
              index={index}
              title={proj.title}
              blurb={proj.blurb}
              sourceUrl={live?.url ?? `https://github.com/sarthak310104/${proj.matchName}`}
              status={proj.status}
              demo={proj.demo}
              demoUrl={proj.demoUrl}
              highlights={proj.highlights}
            />
          );
          const stack = <StackTerminal fileName={`${proj.matchName.toLowerCase()}/stack.txt`} tags={proj.tags} />;
          return (
            <div id={slug(proj.matchName)} className={`proj-row${flip ? " reverse" : ""}`} key={proj.matchName}>
              <Reveal direction="left">{flip ? stack : text}</Reveal>
              <Reveal direction="right">{flip ? text : stack}</Reveal>
            </div>
          );
        })}

        {extras.map((repo: GithubRepo) => {
          index++;
          const flip = index % 2 === 1;
          const tags = repo.stackTags.length ? repo.stackTags : ["needs a stack.txt"];
          const text = (
            <TextCol
              index={index}
              title={repo.name}
              blurb={repo.description ?? "No description yet. Check the repo for details."}
              sourceUrl={repo.url}
              status={{ label: "synced from github", tone: "muted" }}
            />
          );
          const stack = <StackTerminal fileName={`${repo.name.toLowerCase()}/stack.txt`} tags={tags} />;
          return (
            <div id={slug(repo.name)} className={`proj-row${flip ? " reverse" : ""}`} key={repo.name}>
              <Reveal direction="left">{flip ? stack : text}</Reveal>
              <Reveal direction="right">{flip ? text : stack}</Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}