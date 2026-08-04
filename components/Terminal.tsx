"use client";

import { useEffect, useRef, useState } from "react";

type Line = { prompt?: boolean; text: string; color?: string };

const INTRO = [
  "whoami",
  "sarthak painuli — backend engineer, bengaluru",
  "most recently built payment infra @ juspay. before that, nxp semiconductors.",
  "stack: java · spring boot · python · fastapi · postgres · redis",
  "",
  "type 'help' to see available commands",
];

const HELP = [
  "available commands:",
  "  about        jump to background",
  "  experience   jump to work history",
  "  projects     jump to projects",
  "  contact      jump to contact",
  "  resume       open resume",
  "  clear        clear the screen",
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const [introDone, setIntroDone] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let char = 0;
    const fullLine = "$ " + INTRO[0];

    function step() {
      if (cancelled) return;
      if (char <= fullLine.length) {
        setTyped(fullLine.slice(0, char));
        char++;
        setTimeout(step, 28);
      } else {
        setLines([{ prompt: true, text: INTRO[0] }]);
        setTyped("");
        i = 1;
        setTimeout(printRest, 200);
      }
    }

    function printRest() {
      if (cancelled) return;
      if (i < INTRO.length) {
        setLines((prev) => [...prev, { text: INTRO[i] }]);
        i++;
        setTimeout(printRest, 90);
      } else {
        setIntroDone(true);
      }
    }

    step();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, typed]);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    setLines((prev) => [...prev, { prompt: true, text: raw }]);
    if (!cmd) return;

    switch (cmd) {
      case "help":
        setLines((prev) => [...prev, ...HELP.map((t) => ({ text: t }))]);
        break;
      case "about":
      case "cd about":
        setLines((prev) => [...prev, { text: "→ scrolling to about" }]);
        scrollToId("about");
        break;
      case "experience":
      case "cd experience":
        setLines((prev) => [...prev, { text: "→ scrolling to experience" }]);
        scrollToId("experience");
        break;
      case "projects":
      case "cd projects":
      case "ls projects":
        setLines((prev) => [...prev, { text: "→ scrolling to projects" }]);
        scrollToId("projects");
        break;
      case "contact":
      case "cd contact":
        setLines((prev) => [...prev, { text: "→ scrolling to contact" }]);
        scrollToId("contact");
        break;
      case "resume":
        setLines((prev) => [...prev, { text: "→ opening resume in a new tab" }]);
        window.open("/resume.pdf", "_blank");
        break;
      case "sudo hire-me":
        setLines((prev) => [
          ...prev,
          { text: "permission granted. scrolling to contact", color: "var(--live)" },
        ]);
        scrollToId("contact");
        break;
      case "clear":
        setLines([]);
        break;
      case "whoami":
        setLines((prev) => [...prev, ...INTRO.map((t) => ({ text: t }))]);
        break;
      default:
        setLines((prev) => [
          ...prev,
          { text: `command not found: ${cmd} — try 'help'`, color: "var(--text-muted)" },
        ]);
    }
  }

  return (
    <div
      className="win scanlines flicker-in"
      onClick={() => inputRef.current?.focus()}
      style={{ cursor: "text" }}
    >
      <div className="win-bar">
        <span className="win-dot" style={{ background: "#e0605080" }} />
        <span className="win-dot" style={{ background: "#e0a95080" }} />
        <span className="win-dot" style={{ background: "#50c07880" }} />
        <span className="win-title">intro.sh — zsh</span>
        <span
          className="mono"
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "var(--live)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            className="live-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--live)",
              display: "inline-block",
            }}
          />
          live
        </span>
      </div>
      <div
        ref={bodyRef}
        className="mono"
        style={{
          padding: "20px 20px 16px",
          fontSize: 14,
          minHeight: 260,
          maxHeight: 340,
          overflowY: "auto",
        }}
      >
        {lines.map((l, idx) => (
          <div
            key={idx}
            style={{
              color: l.color ?? (l.prompt ? "var(--text-primary)" : "var(--text-secondary)"),
              marginBottom: 4,
              whiteSpace: "pre-wrap",
            }}
          >
            {l.prompt ? <span style={{ color: "var(--amber)" }}>$ </span> : null}
            {l.text}
          </div>
        ))}
        {typed && (
          <div style={{ color: "var(--text-primary)" }}>
            <span style={{ color: "var(--amber)" }}>{typed}</span>
            <span className="cursor-blink">▌</span>
          </div>
        )}
        {introDone && (
          <div style={{ display: "flex", alignItems: "center", color: "var(--text-primary)" }}>
            <span style={{ color: "var(--amber)", marginRight: 6 }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runCommand(input);
                  setInput("");
                }
              }}
              autoFocus
              spellCheck={false}
              aria-label="terminal command input"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontFamily: "var(--mono)",
                fontSize: 14,
              }}
            />
          </div>
        )}
      </div>
      <style>{`
        .cursor-blink { animation: blink 1s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}