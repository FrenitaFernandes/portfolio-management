import { useEffect, useMemo, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "resume", label: "Resume" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "certifications", label: "Certifications" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = document.querySelectorAll("section[id]");

      let current = "hero";

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 140;
        const height = (section as HTMLElement).offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    window.scrollTo({
      top: section.offsetTop - 90,
      behavior: "smooth",
    });

    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/60"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell h-20 flex items-center justify-between">

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="display text-3xl font-extrabold text-[var(--primary)]"
        >
          Frenita
        </button>

        <nav className="hidden lg:flex items-center gap-9">

          {links.map((link) => (

            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative font-semibold transition duration-300

              ${
                active === link.id
                  ? "text-[var(--primary)]"
                  : "text-slate-700 hover:text-[var(--primary)]"
              }

              after:absolute
              after:left-0
              after:-bottom-2
              after:h-[2px]
              after:bg-[var(--primary)]
              after:rounded-full
              after:transition-all

              ${
                active === link.id
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
              }
              `}
            >
              {link.label}
            </button>

          ))}

        </nav>

        <button
          className="lg:hidden w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300

        ${
          open
            ? "max-h-[500px]"
            : "max-h-0"
        }

        bg-white/95 backdrop-blur-xl`}
      >

        <div className="section-shell py-5 flex flex-col gap-2">

          {links.map((link) => (

            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`rounded-xl py-3 font-semibold transition

              ${
                active === link.id
                  ? "bg-[var(--soft-primary)] text-[var(--primary)]"
                  : "hover:bg-slate-100"
              }
              `}
            >
              {link.label}
            </button>

          ))}

        </div>

      </div>
    </header>
  );
}

export default Navbar;