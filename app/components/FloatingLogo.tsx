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
      <a href="/">
        <Image
          src="/images/BeyondTC_Logo_White.webp"
          alt="Beyond the Coverage"
          width={80}
          height={80}
          priority
          className="h-20 w-auto drop-shadow"
        />
      </a>
    </div>
  );
}