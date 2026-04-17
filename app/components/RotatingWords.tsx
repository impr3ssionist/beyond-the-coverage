'use client';

import { useState, useEffect } from 'react';

interface RotatingWordsProps {
  words?: string[];
  className?: string;
}

export default function RotatingWords({
  words = ['benefits', 'consulting', 'support', 'guidance',],
  className = '',
}: RotatingWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={`inline-flex gap-3 ${className}`}>
      <span className="inline">Employee</span>
      <span className="inline-block relative min-w-32 text-left">
        {words.map((word, index) => (
          <span
            key={word}
            className={`absolute left-0 transition-all duration-500 ${
              index === currentIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
            style={{
              transform: index === currentIndex ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
