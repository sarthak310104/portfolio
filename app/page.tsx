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
      <footer className="footer">
        <div className="wrap mono">
          <span>built with next.js + three.js</span>
          <span>© {new Date().getFullYear()} sarthak painuli // end of transmission</span>
        </div>
      </footer>
    </>
  );
}