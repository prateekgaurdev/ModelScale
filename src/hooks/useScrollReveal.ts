import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to all elements matching
 * `.reveal`, `.reveal-blur`, or `.reveal-scale` within the
 * given container (or `document` by default).
 *
 * When an element enters the viewport, `.is-visible` is added
 * which triggers the CSS transitions defined in global.css.
 */
export function useScrollReveal(containerRef?: React.RefObject<Element>) {
  useEffect(() => {
    const root = containerRef?.current ?? document;

    const targets = (root as Document | Element).querySelectorAll(
      '.reveal, .reveal-blur, .reveal-scale'
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Only animate once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/**
 * Vanilla (non-React) version for use in .astro <script> tags.
 * Call initScrollReveal() after DOMContentLoaded.
 */
export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-blur, .reveal-scale');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
