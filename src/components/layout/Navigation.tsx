import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { socials } from "../../data/socials";

const NAV_LINKS = [
  { label: "WORK", href: "/work" },
  { label: "JOURNEY", href: "/about" },
  { label: "STACK", href: "/credentials" }, // using credentials for stack as per placeholders
  { label: "ACTIVITY", href: "/activity/github" },
  { label: "CONTACT", href: "/contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const hasResume = socials.resume !== "#";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/activity/github") return location.pathname.startsWith("/activity");
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled ? "border-b border-border bg-background/85 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl" : "bg-background/20 py-6 backdrop-blur-[2px]"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Link 
            to="/" 
            className="font-sans font-bold text-xl tracking-tighter text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            VC
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className={`group relative rounded-sm px-1 py-0.5 font-mono text-sm tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive(link.href) ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-px h-4 bg-border" />
            {hasResume ? (
              <ButtonLink href={socials.resume} target="_blank" variant="outline" size="sm">
                Resume
              </ButtonLink>
            ) : (
              <ButtonLink to="/contact" variant="outline" size="sm">
                Let's Talk
              </ButtonLink>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-border/50 p-6">
              <span className="font-sans font-bold text-xl tracking-tighter text-foreground">VC</span>
              <button
                className="text-foreground p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center px-8 pb-20">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 font-sans text-3xl font-medium tracking-tight transition-colors ${
                        isActive(link.href) ? "text-accent" : "text-foreground hover:text-accent"
                      }`}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 }}
                  className="mt-8"
                >
                  {hasResume ? (
                    <ButtonLink href={socials.resume} target="_blank" variant="primary" size="lg" className="w-full justify-center">
                      Resume
                    </ButtonLink>
                  ) : (
                    <ButtonLink to="/contact" variant="primary" size="lg" className="w-full justify-center">
                      Let's Talk
                    </ButtonLink>
                  )}
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
