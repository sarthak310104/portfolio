"use client";

import { useEffect, useRef, useState } from "react";

type Line = { prompt?: boolean; text: string; tone?: "ok" | "warn" | "accent" | "muted" | "hot" };

const RESUME = "/Sarthak_Painuli_Resume.pdf";

const BOOT: Line[] = [
  { text: "[ OK ] mounting /dev/sarthak", tone: "ok" },
  { text: "[ OK ] loading modules: backend, frontend, infra, ai", tone: "ok" },
  { text: "[ OK ] linking ghost-protocol telemetry", tone: "ok" },
  { text: "[ -- ] uplink: bengaluru, IN // open to relocation", tone: "muted" },
];

const WHOAMI: Line[] = [
  { text: "sarthak painuli: software engineer, bengaluru", tone: "accent" },
  { text: "ex product engineer @ juspay (payments). before that, nxp semiconductors." },
  { text: "stack: python · fastapi · java · node.js · postgres · redis · next.js" },
  { text: "currently: building ghost protocol, a behavioral twin for production systems" },
];

const HELP: Line[] = [
  { text: "available commands:", tone: "accent" },
  { text: "  whoami       who's on the other end" },
  { text: "  neofetch     system readout" },
  { text: "  ghost        jump to ghost protocol" },
  { text: "  projects     jump to projects" },
  { text: "  experience   jump to work history" },
  { text: "  about        jump to background" },
  { text: "  contact      open a channel" },
  { text: "  resume       download resume" },
  { text: "  clear        clear the screen" },
  { text: "  tip: tab completes, ↑/↓ walks history", tone: "muted" },
];

const NEOFETCH: Line[] = [
  { text: "   ▲        sarthak@core", tone: "accent" },
  { text: "  ▲ ▲       ─────────────────" },
  { text: " ▲   ▲      os:      human (bengaluru build)" },
  { text: "▲▲▲▲▲▲▲     role:    software engineer" },
  { text: "            focus:   distributed systems, observability, apis" },
  { text: "            uptime:  ~1y professional, coding since b.tech cse (2021)" },
  { text: "            flagship: ghost protocol", tone: "hot" },
];

const COMMANDS = ["help", "whoami", "neofetch", "ghost", "projects", "experience", "about", "contact", "resume", "clear", "sudo hire-me"];
const CHIPS = ["help", "neofetch", "ghost", "projects", "resume"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pulse() {
  window.dispatchEvent(new Event("holo:pulse"));
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // boot sequence, then type "whoami"
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(() => !cancelled && fn(), ms));

    let t = 150;
    BOOT.forEach((l) => {
      later(() => setLines((p) => [...p, l]), t);
      t += 220;
    });
    const cmd = "whoami";
    for (let c = 1; c <= cmd.length; c++) {
      later(() => setTyped(cmd.slice(0, c)), t + c * 55);
    }
    t += cmd.length * 55 + 200;
    later(() => {
      setTyped("");
      setLines((p) => [...p, { prompt: true, text: cmd }]);
    }, t);
    WHOAMI.forEach((l, i) => later(() => setLines((p) => [...p, l]), t + 90 * (i + 1)));
    later(() => {
      setLines((p) => [...p, { text: "type 'help' or tap a command below", tone: "muted" }]);
      setReady(true);
    }, t + 90 * (WHOAMI.length + 1));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, typed]);

  function print(ls: Line[]) {
    setLines((p) => [...p, ...ls]);
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    setLines((p) => [...p, { prompt: true, text: raw }]);
    if (!cmd) return;
    setHistory((h) => [raw, ...h].slice(0, 30));
    setHIdx(-1);
    pulse();

    const jump = (id: string, label: string) => {
      print([{ text: `→ routing to ${label}`, tone: "ok" }]);
      setTimeout(() => scrollToId(id), 250);
    };

    switch (cmd) {
      case "help":
      case "ls":
        return print(HELP);
      case "whoami":
        return print(WHOAMI);
      case "neofetch":
        return print(NEOFETCH);
      case "ghost":
      case "ghost-protocol":
        return jump("project-ghost-protocol-emp", "ghost protocol");
      case "projects":
      case "cd projects":
      case "ls projects":
        return jump("projects", "projects");
      case "experience":
      case "cd experience":
        return jump("experience", "experience");
      case "about":
      case "cd about":
        return jump("about", "about");
      case "contact":
      case "cd contact":
        return jump("contact", "contact");
      case "resume":
        print([{ text: "→ opening resume in a new tab", tone: "ok" }]);
        window.open(RESUME, "_blank");
        return;
      case "sudo hire-me":
        print([{ text: "access granted. opening a channel.", tone: "hot" }]);
        setTimeout(() => scrollToId("contact"), 300);
        return;
      case "clear":
        setLines([]);
        return;
      default:
        print([{ text: `command not found: ${cmd}. try 'help'`, tone: "warn" }]);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const hit = COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()) && input.trim());
      if (hit) setInput(hit);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      if (history[n] !== undefined) {
        setHIdx(n);
        setInput(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(Math.max(n, -1));
      setInput(n >= 0 ? history[n] : "");
    }
  }

  // 3D tilt toward the cursor
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }
  function onLeave() {
    const el = panelRef.current;
    el?.style.setProperty("--rx", "0deg");
    el?.style.setProperty("--ry", "0deg");
  }

  const suggestion =
    input.trim() && COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()) && c !== input.trim().toLowerCase());

  return (
    <div className="holo-stage" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={panelRef} className="holo-term hud" onClick={() => inputRef.current?.focus()}>
        <span className="hud-c tl" />
        <span className="hud-c tr" />
        <span className="hud-c bl" />
        <span className="hud-c br" />
        <div className="holo-glare" />
        <div className="holo-scan" />

        <div className="holo-bar mono">
          <span className="holo-tag">[ SYS.TERM ]</span>
          <span className="holo-title">intro.sh // tty0</span>
          <span className="holo-meter" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `${i * 90}ms` }} />
            ))}
          </span>
          <span className="holo-live">
            <span className="live-dot" /> online
          </span>
        </div>

        <div ref={bodyRef} className="holo-body mono">
          {lines.map((l, i) => (
            <div key={i} className={`tl tone-${l.tone ?? (l.prompt ? "prompt" : "base")}`}>
              {l.prompt && <span className="ps1">sarthak@core:~$ </span>}
              {l.text}
            </div>
          ))}
          {typed && (
            <div className="tl tone-prompt">
              <span className="ps1">sarthak@core:~$ </span>
              {typed}
              <span className="caret">▌</span>
            </div>
          )}
          {ready && (
            <div className="holo-input">
              <span className="ps1">sarthak@core:~$</span>
              <div className="holo-input-wrap">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal command input"
                />
                {suggestion && (
                  <span className="ghost-hint" aria-hidden="true">
                    <span style={{ visibility: "hidden" }}>{input}</span>
                    {suggestion.slice(input.trim().length)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="holo-chips mono">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              disabled={!ready}
              onClick={(e) => {
                e.stopPropagation();
                run(c);
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}