import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0" }}>
        <div className="wrap mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>
          built with next.js — last deploy: {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}
