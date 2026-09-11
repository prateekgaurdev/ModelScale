# NEXORA | Digital Product Engineering & Strategic AI Consulting

A high-performance, enterprise-grade digital product engineering and AI consulting website built with **Astro**, **React**, **Tailwind CSS**, and **GSAP**. Inspired by premium digital agency aesthetics (like Appinventiv), NEXORA features fluid animations, smooth scrolling, and an interactive, highly-optimized frontend.

## 🚀 Features

- **Blazing Fast Performance:** Powered by [Astro](https://astro.build/)'s Island Architecture, delivering zero-JS static HTML by default and only hydrating React components where interactivity is needed.
- **Premium Animations:** Custom `cubic-bezier` transitions, staggered text reveals (`.line-anim`), and 3D perspective carousels powered by [GSAP](https://gsap.com/) and [Framer Motion](https://www.framer.com/motion/).
- **Smooth Scrolling:** Buttery-smooth, momentum-based scrolling across all devices using [@studio-freight/lenis](https://github.com/studio-freight/lenis).
- **Interactive UI Components:**
  - **Mega Menu:** Multi-column dropdowns with staggered fade-in animations and glassmorphism.
  - **Draggable Portfolio Slider:** GSAP `Draggable` and `InertiaPlugin` powered carousel with 20° 3D card rotation based on scroll distance.
  - **3D Testimonials:** Vertical flip carousel using `rotationX` and custom GSAP easing.
  - **Asymmetric Bento Grids:** Hover-expand expertise grids and diagonal staircase service layouts.
  - **Mouse Followers:** Custom cursor indicators (e.g., "DRAG" labels, directional arrows) tied to `requestAnimationFrame` for zero-latency tracking.
- **Responsive & Fluid:** Typography and spacing scale seamlessly using CSS `clamp()` and a strict 8pt spatial grid.
- **Enterprise Aesthetics:** Dark mode, deep space gradients, glassmorphic cards (`backdrop-blur`), and SVG-based UI elements.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation Engine:** [GSAP](https://gsap.com/) (ScrollTrigger, Draggable, InertiaPlugin) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/) (or npm/yarn/pnpm)

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and your preferred package manager installed. We recommend [Bun](https://bun.sh/) for the fastest experience.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url> nexora-frontend
   cd nexora-frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   # or npm install
   # or yarn install
   ```

3. Start the development server:
   ```bash
   bun run dev
   # or npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321`.

### Building for Production

To create an optimized, production-ready static build:

```bash
bun run build
# or npm run build
```

The output will be generated in the `/dist` directory. You can preview the production build locally using:

```bash
bun run preview
# or npm run preview
```

## 📂 Project Structure

```text
nexora-frontend/
├── public/
│   └── assets/
│       ├── images/        # High-res SVGs, WebP images, and partner logos
│       └── video/         # Background MP4 videos
├── src/
│   ├── components/
│   │   ├── Alliances/     # Strategic partners marquee
│   │   ├── Awards/        # Accreditations timeline
│   │   ├── Compliance/    # Timed auto-advancing accordion
│   │   ├── FAQ/           # Interactive accordions
│   │   ├── Footer/        # Global footer
│   │   ├── GlobalLeaders/ # Dual-direction infinite marquees
│   │   ├── Header/        # Navbar & Mega Menu (React Island)
│   │   ├── Hero/          # Video Hero & Awards Carousel
│   │   ├── Modals/        # Contact & Exit-Intent lead capture modals
│   │   ├── NexoraAI/      # AI Spotlight features
│   │   ├── Portfolio/     # GSAP Draggable Case Studies Slider
│   │   ├── Services/      # Diagonal Bento Grid & Split Scroll
│   │   ├── TechExpertise/ # Hover-expand capabilities grid
│   │   └── Testimonials/  # 3D vertical flip carousel
│   ├── hooks/
│   │   └── useScrollReveal.ts # IntersectionObserver for scroll animations
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main page shell, metadata, and global scripts
│   ├── pages/
│   │   └── index.astro        # Homepage entry point
│   ├── scripts/
│   │   └── nexora-animations.js # Master animation engine (Lenis + GSAP)
│   └── styles/
│       └── global.css         # Tailwind directives, theme variables, and custom CSS
├── astro.config.mjs       # Astro configuration (React, Tailwind)
├── tailwind.config.mjs    # Tailwind theme, fluid typography, and keyframes
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Design System & Animation Philosophy

- **The "Double-Bezel" Pattern:** Interactive cards use an outer shell with a subtle border and an inner core to simulate physical depth.
- **`swap-text-button`:** All primary CTAs use a dual-span + dual-SVG hover animation. The text and icon slide up and out, immediately replaced by a clone sliding in from below.
- **Scroll-Driven Reveal:** Handled by a lightweight `IntersectionObserver` (`useScrollReveal`), elements fade and slide up (`.reveal`, `.reveal-blur`, `.reveal-scale`) as they enter the viewport.
- **Performance First:** GSAP handles complex DOM manipulations (like the Draggable portfolio slider) while Lenis runs on a single `requestAnimationFrame` loop tied to the GSAP ticker, preventing layout thrashing and ensuring 60fps performance even on mobile.

## 📄 License

This project is proprietary. All rights reserved by NEXORA.
