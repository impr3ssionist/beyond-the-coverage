"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div className={`fixed top-0 left-0 z-[9999] h-20 flex items-center transition-opacity duration-300 ${
      scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}>
      <div className="bg-gradient-to-br from-white/40 to-white/5 rounded-full p-3">
        <a href="/">
          <Image
            src="/images/beyondtc_logo.png"
            alt="Beyond the Coverage"
            width={200}
            height={200}
            priority
            quality={100}
            className="h-20 w-auto"
          />
        </a>
      </div>
    </div>
  );
}