const LINKS = [
  { label: "email", value: "sarthak.painuli3101@gmail.com", href: "mailto:sarthak.painuli3101@gmail.com" },
  { label: "linkedin", value: "linkedin.com/in/sarthak-painuli", href: "https://linkedin.com/in/sarthak-painuli" },
  { label: "github", value: "github.com/sarthak310104", href: "https://github.com/sarthak310104" },
  { label: "leetcode", value: "leetcode.com/u/sarthak310104", href: "https://leetcode.com/u/sarthak310104" },
];

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Contact() {
  return (
    <section id="contact">
      <Reveal>
      <div className="wrap">
        <SectionHead index="04" eyebrow="contact" title="mail --compose" />
        <div className="win contact-win" style={{ maxWidth: 620 }}>
          <div className="win-bar">
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-dot" />
            <span className="win-title">reach-out</span>
          </div>
          <div style={{ padding: 24 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 20px" }}>
              Open to software engineering roles (backend, full-stack, SDE-1) anywhere
              in India, and open to relocating abroad. The fastest way to reach me is email.
            </p>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="mono contact-link"
              >
                <span style={{ color: "var(--text-muted)" }}>{l.label}</span>
                <span className="contact-val">{l.value} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  );
}