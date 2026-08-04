import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section id="top" style={{ borderTop: "none", paddingTop: 64 }}>
      <div className="wrap">
        <p className="eyebrow">backend engineer / bengaluru</p>
        <h1 style={{ fontSize: 40, lineHeight: 1.25, marginBottom: 16, maxWidth: 640 }}>
          I build the parts of the system that aren&apos;t supposed to break.
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 560, marginBottom: 32 }}>
          Payment infrastructure at Juspay, developer tools on the side. This
          terminal actually works — try typing into it.
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <a href="#projects" className="btn">
            ./view-projects
          </a>
          <a href="#contact" className="btn btn-violet">
            ./get-in-touch
          </a>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
