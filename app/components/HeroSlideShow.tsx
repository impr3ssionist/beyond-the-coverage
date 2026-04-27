"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RotatingWords from "./RotatingWords";

const slides = [
  "/images/boulderflatirons.jpg",
  "/images/rockymountains.jpg",
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide}
            alt={`Hero background slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-6xl px-6 pt-[126px] text-white">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-white/90">
              Beyond the Coverage
            </p>

            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              Employee <RotatingWords
                words={['Benefit', 'Consulting', 'Support', 'Guidance']}
                className="text-4xl md:text-7xl"
              />
              <br />
              and Insurance Expertise
            </h1>

            <p className="mb-10 max-w-2xl text-lg md:text-xl leading-relaxed text-white/95">
              Clear, personalized guidance that goes beyond the basic coverage— we help you compare plans, understand your options, and choose with confidence.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black hover:scale-105"
              >
                Get a Free Coverage Review
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 font-semibold text-black transition-all duration-200 hover:bg-gray-100 hover:scale-105"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}