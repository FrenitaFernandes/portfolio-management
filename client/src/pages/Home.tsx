import Navbar from "../components/Navbar";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Resume from "../sections/Resume";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Certifications from "../sections/Certifications";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <BackgroundAnimation />
      <Navbar />

      <Hero />
      <About />
      <Resume />
      <Skills />
      <Projects />
      <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
    </>
  );
}

export default Home;