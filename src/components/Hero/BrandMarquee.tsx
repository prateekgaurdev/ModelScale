import React from 'react';

const brands = [
  { name: 'IKEA', logo: '/assets/images/ikea-new-logo-2.svg' },
  { name: 'KFC', logo: '/assets/images/home-global-leader-kfc-icon.svg' },
  { name: 'Adidas', logo: '/assets/images/adidas-new-logo.svg' },
  { name: 'Google Cloud', logo: '/assets/images/home-global-leader-google-icon.svg' },
  { name: 'Boston Consulting Group', logo: '/assets/images/home-global-leader-bcg-icon.svg' },
  { name: 'Americana Group', logo: '/assets/images/home-global-leader-americana.svg' },
  { name: 'Domino’s', logo: '/assets/images/dominos-new-logo-2.svg' },
  { name: 'PVR Cinemas', logo: '/assets/images/home-global-leader-pvr-icon.svg' },
  { name: 'Krispy Kreme', logo: '/assets/images/home-global-leader-krispy-kreme-icon.svg' },
  { name: 'Flynas Airlines', logo: '/assets/images/flynas-card-logo.svg' },
  { name: 'Dr. Reddy’s', logo: '/assets/images/dr-reddy-home-logo.svg' },
  { name: 'Tim Hortons', logo: '/assets/images/home-global-leader-tim-hortons-icon.svg' },
  { name: 'Virgin Mobile', logo: '/assets/images/home-global-leader-virgin-mobile-icon.svg' },
];

export default function BrandMarquee() {
  return (
    <div className="w-full py-8 border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden relative">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 mb-4 text-center">
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Trusted by Fortune 500 Enterprises, Global Brands & Tech Pioneers
        </span>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 items-center gap-12 sm:gap-16 py-2 animate-marquee whitespace-nowrap">
          {brands.concat(brands).map((brand, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center h-12 min-w-[120px] px-4 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-8 max-w-[130px] w-auto h-auto object-contain filter brightness-125"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const span = document.createElement('span');
                    span.className = 'fallback-text text-sm font-bold text-gray-300 tracking-wider';
                    span.innerText = brand.name;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
