import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const awards = [
  {
    source: 'The Economic Times',
    year: '2026',
    title: 'Leader in AI-First Product Engineering',
    badge: '/assets/images/economic-times-2023-badge.svg',
    color: 'from-blue-600/20 to-indigo-900/40',
  },
  {
    source: 'Deloitte Tech Fast 50',
    year: '2024 - 2025',
    title: 'Fastest Growing Technology Enterprise',
    badge: '/assets/images/deloitte-fast50.svg',
    color: 'from-emerald-600/20 to-teal-900/40',
  },
  {
    source: 'Clutch Global Leader',
    year: '2026',
    title: 'Top AI & Custom Software Engineering Firm',
    badge: '/assets/images/clutch-2025-badge.svg',
    color: 'from-amber-600/20 to-yellow-900/40',
  },
  {
    source: 'CIO Technology Excellence',
    year: '2025',
    title: 'Enterprise Digital Transformation Innovator',
    badge: '/assets/images/cio-badge-award.svg',
    color: 'from-purple-600/20 to-blue-900/40',
  },
];

export default function HeroAwardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextAward = () => setCurrentIndex((prev) => (prev + 1) % awards.length);
  const prevAward = () => setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0">
      <div className="relative p-5 rounded-2xl bg-gradient-to-r from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-nexora-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-black/60 border border-white/15 p-2 flex items-center justify-center shrink-0">
              <img 
                src={awards[currentIndex].badge} 
                alt={awards[currentIndex].source}
                className="w-full h-full object-contain filter brightness-110"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-nexora-yellow uppercase tracking-wider">
                  {awards[currentIndex].source}
                </span>
                <span className="text-[10px] text-gray-400 font-mono px-1.5 py-0.5 rounded bg-white/10">
                  {awards[currentIndex].year}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mt-0.5 tracking-tight">
                {awards[currentIndex].title}
              </h4>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={prevAward}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
              aria-label="Previous Award"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextAward}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
              aria-label="Next Award"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex gap-1.5 mt-3 pt-3 border-t border-white/5">
          {awards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-nexora-blue' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
