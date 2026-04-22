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
      <style>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.85);
          }
          60% {
            transform: translateY(8px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
        }
        
        .rotating-word-enter {
          animation: dropIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .rotating-word-exit {
          animation: fadeOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <span className="inline">Employee</span>
      <span className="inline-block relative min-w-32 text-left">
        {words.map((word, index) => (
          <span
            key={word}
            className={`absolute left-0 ${
              index === currentIndex
                ? 'rotating-word-enter pointer-events-auto'
                : 'rotating-word-exit pointer-events-none'
            }`}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
