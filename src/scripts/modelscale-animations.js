/**
 * modelscale-animations.js
 * Master animation engine — Lenis smooth scroll + GSAP ScrollTrigger
 * Matches appinventiv.com's home-desktop.js animation patterns.
 * Injected as a <script type="module"> in BaseLayout.astro
 */

// ── Scroll restoration reset (same as home-desktop.js line 3-8) ─────────────
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// ── Dynamic imports so bundle stays lean ─────────────────────────────────────
Promise.all([
  import("gsap"),
  import("gsap/ScrollTrigger"),
  import("gsap/Draggable"),
  import("@studio-freight/lenis"),
]).then(([gsapMod, stMod, draggableMod, lenisMod]) => {
  const gsap       = gsapMod.gsap      ?? gsapMod.default;
  const ScrollTrigger = stMod.ScrollTrigger;
  const Draggable  = draggableMod.Draggable;
  const Lenis      = lenisMod.default  ?? lenisMod.Lenis;

  gsap.registerPlugin(ScrollTrigger, Draggable);

  // ─────────────────────────────────────────────────────────────────────────
  //  1. LENIS SMOOTH SCROLL (exact config from appinventiv home-desktop.js)
  // ─────────────────────────────────────────────────────────────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    lerp: 0.05,
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    wheelMultiplier: 1,
    infinite: false,
    autoResize: true,
  });

  // expose for other modules
  window.__lenis = lenis;

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Reset to top on load (double RAF — same as appinventiv)
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        lenis.scrollTo(0, { immediate: true, force: true });
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh(true);
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  //  2. .line-anim — PER-CHARACTER text reveal
  //     Matches appinventiv initTextAnimations() exactly
  // ─────────────────────────────────────────────────────────────────────────
  function initLineAnimations() {
    document.querySelectorAll(".line-anim").forEach((heading) => {
      // Already processed?
      if (heading.dataset.lineAnimDone) return;
      heading.dataset.lineAnimDone = "1";

      heading.querySelectorAll("span").forEach((lineSpan) => {
        const walker = document.createTreeWalker(lineSpan, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const textNodes = [];
        while ((node = walker.nextNode())) {
          if (node.nodeValue.trim() !== "") textNodes.push(node);
        }

        textNodes.forEach((textNode) => {
          const parent = textNode.parentNode;
          const text   = textNode.nodeValue;
          const frag   = document.createDocumentFragment();

          if (window.innerWidth <= 767) {
            // Mobile: per-word
            text.split(" ").forEach((word, i, arr) => {
              const s = document.createElement("span");
              s.textContent = word;
              s.style.display = "inline-block";
              frag.appendChild(s);
              if (i !== arr.length - 1) frag.appendChild(document.createTextNode(" "));
            });
          } else {
            // Desktop: per-character
            [...text].forEach((char) => {
              const s = document.createElement("span");
              s.textContent = char === " " ? "\u00A0" : char;
              s.style.display = "inline-block";
              frag.appendChild(s);
            });
          }
          parent.replaceChild(frag, textNode);
        });
      });

      const chars = heading.querySelectorAll("span span");
      gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "top 82%",
          once: true,
          refreshPriority: 1,
          invalidateOnRefresh: false,
        },
      }).from(chars, {
        y: 10,
        opacity: 0,
        stagger: 0.01,
        ease: "power2.out",
        duration: 0.2,
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  3. .reveal / .reveal-blur / .reveal-scale — scroll-driven entry
  //     Uses IntersectionObserver (CSS transitions already defined in global.css)
  // ─────────────────────────────────────────────────────────────────────────
  function initRevealObserver() {
    const targets = document.querySelectorAll(".reveal, .reveal-blur, .reveal-scale");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  4. SERVICES SECTION PIN SCROLL ANIMATION
  //     Pins the .home-services-section to top of viewport.
  //     Cards (.scrollable-card-N .service-card:not(.service-card--empty)) 
  //     travel upward by their distance from the wrapper top — diagonal effect.
  //     Matches appinventiv initServicesSectionHeaderPin() exactly.
  // ─────────────────────────────────────────────────────────────────────────
  function initServicesPin() {
    if (window.innerWidth <= 1023) return;

    const section = document.querySelector(".services-section");
    const header  = document.querySelector(".services-header");
    const grid    = document.querySelector(".services-grid");

    // The three "real" cards that need to travel upward
    const cards = [
      document.querySelector(".services-row:nth-child(2) .service-card:not(.service-card--empty)"),
      document.querySelector(".services-row:nth-child(3) .service-card:not(.service-card--empty)"),
      document.querySelector(".services-row:nth-child(4) .service-card:not(.service-card--empty)"),
    ];

    if (!section || !header || !grid || cards.some((c) => !c)) return;

    function getCardTravel(card) {
      const sectionRect = section.getBoundingClientRect();
      const gridRect    = grid.getBoundingClientRect();
      const cardRect    = card.getBoundingClientRect();
      return Math.max(0, cardRect.top - sectionRect.top - (gridRect.top - sectionRect.top));
    }

    gsap.set(cards, { y: 0 });

    const tl = gsap.timeline({ paused: true });
    let st;

    function buildTl() {
      tl.clear();
      const distances = cards.map(getCardTravel);
      tl.to(cards[0], { y: -distances[0], ease: "none", duration: 1 })
        .to(cards[1], { y: -distances[1], ease: "none", duration: 1 }, 0)
        .to(cards[2], { y: -distances[2], ease: "none", duration: 1 }, 0);
      return Math.max(...distances);
    }

    function createST() {
      const dist = buildTl();
      if (st) st.kill();
      st = ScrollTrigger.create({
        trigger:        section,
        start:          "top top",
        end:            () => `+=${Math.ceil(dist + 60)}`,
        pin:            true,
        pinSpacing:     true,
        scrub:          0.5,
        animation:      tl,
        invalidateOnRefresh: true,
        anticipatePin:  1,
        refreshPriority: 1,
        onRefresh: () => { buildTl(); },
      });
    }

    requestAnimationFrame(createST);

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 1023) {
          if (st) st.kill();
          gsap.set(cards, { clearProps: "transform" });
        } else {
          createST();
          ScrollTrigger.refresh();
        }
      }, 250);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  //  RUN ALL
  // ─────────────────────────────────────────────────────────────────────────
  function runAll() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    initRevealObserver();
    initLineAnimations();
    if (window.innerWidth > 1023) {
      initServicesPin();
    }
    setTimeout(() => ScrollTrigger.refresh(), 250);
  }

  // Run after full DOM paint
  if (document.readyState === "complete") {
    runAll();
  } else {
    window.addEventListener("load", runAll);
  }

  // Expose for external use (portfolio, testimonials)
  window.__gsap = gsap;
  window.__ScrollTrigger = ScrollTrigger;
  window.__Draggable = Draggable;
});
