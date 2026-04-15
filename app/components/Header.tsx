"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Desktop nav: always visible */}
      <div className="fixed top-0 right-0 z-[9999] hidden h-20 items-center px-6 md:flex">
        <nav className="flex items-center gap-6">
          <a
            href="#services"
            className={`text-sm transition-colors duration-300 ${
              scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
            }`}
          >
            Services
          </a>
          <a
            href="#about"
            className={`text-sm transition-colors duration-300 ${
              scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
            }`}
          >
            About
          </a>
          <a
            href="#trust"
            className={`text-sm transition-colors duration-300 ${
              scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
            }`}
          >
            Trust
          </a>
          <a
            href="#contact"
            className={`text-sm transition-colors duration-300 ${
              scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
            }`}
          >
            Contact
          </a>
          <a
            href="#contact"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "bg-primary text-white"
                : "border border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            Get Started
          </a>
        </nav>
      </div>

      {/* Mobile hamburger: always visible */}
      <div className="fixed top-0 right-0 z-[9999] flex h-20 items-center px-6 md:hidden">
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-7 transition-colors duration-300 ${
                scrolled ? "bg-foreground" : "bg-white"
              }`}
            />
            <span
              className={`block h-0.5 w-7 transition-colors duration-300 ${
                scrolled ? "bg-foreground" : "bg-white"
              }`}
            />
            <span
              className={`block h-0.5 w-7 transition-colors duration-300 ${
                scrolled ? "bg-foreground" : "bg-white"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Scrolled header background only */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-300 ${
          scrolled
            ? "translate-y-0 opacity-100 border-b bg-background/95 backdrop-blur"
            : "-translate-y-full opacity-0"
        }`}
      />

      {/* Full-screen mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[10000] bg-background">
          <div className="flex h-20 items-center justify-end px-6">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <span className="sr-only">Close menu</span>
              <div className="relative h-7 w-7">
                <span className="absolute left-0 top-1/2 block h-0.5 w-7 -translate-y-1/2 rotate-45 bg-foreground" />
                <span className="absolute left-0 top-1/2 block h-0.5 w-7 -translate-y-1/2 -rotate-45 bg-foreground" />
              </div>
            </button>
          </div>

          <nav className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8 px-6 text-center">
            <a
              href="#services"
              className="text-3xl font-semibold text-primary"
              onClick={closeMenu}
            >
              Services
            </a>
            <a
              href="#about"
              className="text-3xl font-semibold text-primary"
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="#trust"
              className="text-3xl font-semibold text-primary"
              onClick={closeMenu}
            >
              Trust
            </a>
            <a
              href="#contact"
              className="text-3xl font-semibold text-primary"
              onClick={closeMenu}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="mt-4 rounded-md bg-primary px-6 py-3 text-lg font-medium text-white"
              onClick={closeMenu}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </>
  );
}