"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "about", id: "about" },
  { href: "#experience", label: "experience", id: "experience" },
  { href: "#projects", label: "projects", id: "projects" },
  { href: "#contact", label: "contact", id: "contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Work out the active section from scroll position on every scroll, so it
    // is always right: nothing is highlighted while you're above "about".
    const update = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= probe) current = l.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-pill mono">
        <a href="#top" className="nav-brand">
          <span className="nav-mark" aria-hidden="true" />
          sarthak<span style={{ color: "var(--amber)" }}>@</span>core
        </a>
        <nav>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.id ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="/Sarthak_Painuli_Resume.pdf" target="_blank" rel="noreferrer" className="nav-cta">
          resume ↗
        </a>
      </div>
    </header>
  );
}