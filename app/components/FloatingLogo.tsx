"use client";

import { useEffect, useState } from "react";

export default function FloatingLogo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-20 flex items-center">
      <a href="/">
        <img
          src="/images/logo.png"
          alt="Beyond the Coverage"
          className={`h-20 w-auto transition-all duration-300 ${
            scrolled ? "opacity-100" : "opacity-100 drop-shadow"
          }`}
        />
      </a>
    </div>
  );
}