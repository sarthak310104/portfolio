const GITHUB_USER = "sarthak310104";

// Repos that should never show up under Projects, even though they're not
// forks. Match is case-insensitive and exact (not substring), so add the
// repo's exact GitHub name here.
const EXCLUDE_NAMES = ["sarthak310104", "sarthak-portfolio", "portfolio"];

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  stackTags: string[];
  stackSource: "stack-file" | "readme" | "languages" | "topics" | "none";
  updatedAt: string;
  stars: number;
  fork: boolean;
};

function stripMarkdown(line: string) {
  return line
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]{1,3}/g, "")
    .trim();
}

function extractSummary(markdown: string): string | null {
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    if (!line) continue;
    if (line.startsWith("#")) continue;
    if (line.startsWith("!")) continue;
    if (line.startsWith("[![")) continue;
    if (/^\[.*\]\(.*\)$/.test(line) && line.length < 80) continue;
    if (line.startsWith(">")) continue;
    if (line.startsWith("<")) continue;

    const cleaned = stripMarkdown(line);
    if (cleaned.length < 30) continue;

    return cleaned.length > 220 ? cleaned.slice(0, 217).trimEnd() + "…" : cleaned;
  }
  return null;
}

// Looks for a "## Tech Stack" / "## Built with" / "## Technologies" style
// heading and pulls the list items (or comma/backtick-separated tokens)
// that follow it, up to the next heading.
function extractStackFromReadme(markdown: string): string[] {
  const lines = markdown.split("\n");
  const headingRe = /^#{1,4}\s*(tech\s*stack|built\s*with|stack|technologies|tools?\s*used)\b/i;
  let inSection = false;
  let inCodeBlock = false;
  const found: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (!inSection) {
      if (headingRe.test(line)) inSection = true;
      continue;
    }

    if (/^#{1,4}\s/.test(line)) break; // next heading ends the section

    if (/^[-*]\s+/.test(line)) {
      const item = stripMarkdown(line.replace(/^[-*]\s+/, ""));
      if (item) found.push(item.split(/[—-]\s/)[0].trim()); // drop trailing "- description"
    } else if (line.includes(",")) {
      line.split(",").forEach((tok) => {
        const t = stripMarkdown(tok);
        if (t && t.length < 30) found.push(t);
      });
    }

    if (found.length >= 10) break;
  }

  return Array.from(new Set(found)).slice(0, 8);
}

async function fetchRaw(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function getReadme(repoName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`,
      { headers: { Accept: "application/vnd.github.raw" }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// Highest-priority source: an explicit stack.txt in the repo root. One tag
// per line, "#" for comments. This is what a repo gets once someone writes
// it a real stack.txt instead of relying on inference.
async function getStackFile(repoName: string): Promise<string[] | null> {
  const text = await fetchRaw(
    `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/HEAD/stack.txt`
  );
  if (!text) return null;
  const tags = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  return tags.length ? tags.slice(0, 10) : null;
}

async function getLanguages(repoName: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/languages`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Object.keys(data).slice(0, 5);
  } catch {
    return [];
  }
}

export async function getProjectRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  const filtered = data
    .filter((r: any) => !r.fork)
    .filter((r: any) => !EXCLUDE_NAMES.includes(String(r.name).toLowerCase()));

  return Promise.all(
    filtered.map(async (r: any) => {
      const readme = await getReadme(r.name);

      // description: GitHub's own field first, then the README's opening
      // paragraph
      const description: string | null =
        r.description ?? (readme ? extractSummary(readme) : null);

      // stack: explicit stack.txt > a "tech stack" section in the README >
      // GitHub's language breakdown > repo topics > nothing
      let stackTags: string[] = [];
      let stackSource: GithubRepo["stackSource"] = "none";

      const fromFile = await getStackFile(r.name);
      if (fromFile) {
        stackTags = fromFile;
        stackSource = "stack-file";
      } else if (readme) {
        const fromReadme = extractStackFromReadme(readme);
        if (fromReadme.length) {
          stackTags = fromReadme;
          stackSource = "readme";
        }
      }
      if (!stackTags.length) {
        const langs = await getLanguages(r.name);
        if (langs.length) {
          stackTags = langs;
          stackSource = "languages";
        } else if (r.topics?.length) {
          stackTags = r.topics.slice(0, 6);
          stackSource = "topics";
        }
      }

      return {
        name: r.name,
        description,
        url: r.html_url,
        stackTags,
        stackSource,
        updatedAt: r.updated_at,
        stars: r.stargazers_count ?? 0,
        fork: r.fork,
      };
    })
  );
}