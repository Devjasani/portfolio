import { Link } from "wouter";
import { useState, useEffect } from "react";
import { m } from "framer-motion";

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-400 ${
            isScrolled
              ? "glass shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group" data-testid="link-logo">
            <img
              src="/logo.webp"
              alt="Dev Jasani Logo"
              className="h-10 md:h-14 w-auto transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Right side — Home + CTA */}
          <nav className="flex items-center gap-5">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
              data-testid="link-home"
            >
              Home
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)] transition-all duration-300"
              data-testid="link-start-project"
            >
              Let's Build
            </Link>
          </nav>
        </m.div>
      </div>
    </header>
  );
}
