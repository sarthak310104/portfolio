# Portfolio

Dark, dev-tool/terminal-themed portfolio built with Next.js (App Router). The
hero is a real interactive terminal — visitors can type commands like
`help`, `projects`, `experience`, `contact`, `resume`, `sudo hire-me` to
navigate. The MockEngine project card embeds a small live demo that
recreates the rule-matching engine client-side.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before you deploy

- Drop your resume PDF at `public/resume.pdf` — the terminal's `resume`
  command opens it in a new tab.
- Update the contact links in `components/Contact.tsx` if any change.
- Add the git-history analytics engine project to `components/Projects.tsx`
  once it's built (there's a placeholder pattern to copy from the existing
  two cards).

## Deploying

The easiest path is [Vercel](https://vercel.com) — connect the repo and it
deploys on every push, zero config needed for a plain Next.js app like this.

## Structure

```
app/            route + global layout + global.css (design tokens)
components/     Nav, Hero, Terminal, About, Experience, Projects, Contact
public/         static assets (add resume.pdf here)
```
