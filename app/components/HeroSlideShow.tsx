"use client";

import { useEffect, useState } from "react";

const slides = [
  "/images/boulderflatirons.jpg",
  "/images/rockymountains.jpg",
  "/images/westernco.jpg",
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
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-6xl px-6 text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.2em]">
            Beyond the Coverage
          </p>
          <h1 className="mb-6 max-w-4xl text-4xl font-bold md:text-6xl">
            Employee Benefits and Consulting 

          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Personalized help reviewing plans, comparing coverage, and making
            informed decisions for yourself and your family.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-md border border-white px-5 py-3 font-medium text-white"
            >
              Get a Free Coverage Review
            </a>
            <a
              href="#services"
              className="rounded-md bg-white px-5 py-3 font-medium text-black"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}