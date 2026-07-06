import { useEffect, useMemo, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("about");

  const links = useMemo(
    () => [
      "About",
      "Resume",
      "Skills",
      "Projects",
      "Experience",
      "Education",
      "Certifications",
      "Contact",
    ],
    []
  );

  const sectionIds = useMemo(
    () => links.map((item) => item.toLowerCase()),
    [links]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];

        if (current?.target?.id) {
          setActiveLink(current.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.65],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  const linkClass = (link: string) => {
    const isActive = activeLink === link.toLowerCase();

    return `relative px-1 py-1 text-sm font-semibold transition ${
      isActive
        ? "text-[var(--primary)]"
        : "text-slate-700 hover:text-[var(--primary)]"
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[var(--primary)] after:transition-all ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 backdrop-blur-2xl border-b border-white/50 shadow-[0_10px_25px_rgba(25,36,66,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell h-20 flex items-center justify-between">
        <a
          href="#"
          className="display text-3xl font-extrabold text-[var(--primary)]"
        >
          Frenita
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={linkClass(link)}
            >
              {link}
            </a>
          ))}
        </div>

        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-xl text-slate-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[360px] border-t border-slate-200/70" : "max-h-0"
        } bg-white/92 backdrop-blur-2xl`}
      >
        <div className="section-shell py-4 grid gap-2">
          {links.map((link) => {
            const isActive = activeLink === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[var(--soft-primary)] text-[var(--primary)]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
