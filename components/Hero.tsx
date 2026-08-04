"use client";

import { useRef } from "react";
import Image from "next/image";
import Terminal from "./Terminal";
import Marquee from "./Marquee";

export default function Hero() {
  const spotRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotRef.current?.style.setProperty("--x", `${x}%`);
    spotRef.current?.style.setProperty("--y", `${y}%`);
  }

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      style={{ borderTop: "none", paddingTop: 64, position: "relative", overflow: "hidden" }}
    >
      <div ref={spotRef} className="spotlight" />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="hero-top">
          <div className="fade-up-stagger">
            <p className="eyebrow" style={{ animationDelay: "0ms" }}>
              backend engineer / bengaluru
            </p>
            <h1
              style={{ fontSize: 40, lineHeight: 1.25, marginBottom: 16, animationDelay: "90ms" }}
            >
              I build the parts of the system that aren&apos;t supposed to break.
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 16,
                marginBottom: 32,
                animationDelay: "180ms",
              }}
            >
              Backend engineer, most recently building payment infrastructure
              at Juspay. This terminal actually works — try typing into it.
            </p>
            <div style={{ display: "flex", gap: 12, animationDelay: "270ms" }}>
              <a href="#projects" className="btn">
                ./view-projects
              </a>
              <a href="#contact" className="btn btn-violet">
                ./get-in-touch
              </a>
            </div>
          </div>

          <div className="hero-photo win">
            <div className="win-bar">
              <span className="win-dot" style={{ background: "#e0605080" }} />
              <span className="win-dot" style={{ background: "#e0a95080" }} />
              <span className="win-dot" style={{ background: "#50c07880" }} />
              <span className="win-title">sarthak.jpg</span>
            </div>
            <Image
              src="/sarthak.jpg"
              alt="Sarthak Painuli"
              width={460}
              height={570}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>

        <div style={{ animationDelay: "360ms", marginTop: 32 }}>
          <Terminal />
        </div>
      </div>
      <div style={{ marginTop: 56 }}>
        <Marquee />
      </div>
    </section>
  );
}