/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexora: {
          blue: {
            DEFAULT: '#1163FB',
            hover: '#0c4fcb',
            light: '#4d8aff',
            glow: 'rgba(17, 99, 251, 0.35)'
          },
          dark: {
            DEFAULT: '#000000',
            surface: '#080a0f',
            card: '#0d1017',
            elevated: '#131720',
            border: '#1e2330',
            muted: '#7a8299'
          },
          yellow: {
            DEFAULT: '#ffff37',
            warm: '#f5e642'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      fontSize: {
        /* Fluid type scale — clamp(min, preferred, max) */
        'display': ['clamp(2.75rem, 5vw + 1rem, 5rem)', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '800' }],
        'headline': ['clamp(2rem, 3.5vw + 0.5rem, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'title': ['clamp(1.375rem, 2vw + 0.25rem, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'lead': ['clamp(1rem, 1.2vw + 0.2rem, 1.25rem)', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label': ['0.6875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.08em' }],
      },
      spacing: {
        /* 8pt spatial grid */
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
      },
      animation: {
        /* Marquee variants */
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        'marquee-r': 'marquee-r 45s linear infinite',
        /* UI micro-interactions */
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        /* Ambient */
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-r': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'snappy': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'reveal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      boxShadow: {
        'glow-blue': '0 0 24px -6px rgba(17, 99, 251, 0.6)',
        'glow-blue-lg': '0 0 48px -10px rgba(17, 99, 251, 0.5)',
        'glow-blue-sm': '0 0 12px -4px rgba(17, 99, 251, 0.5)',
        'card-lift': '0 8px 40px -12px rgba(0, 0, 0, 0.7)',
        'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.07)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        /* Bento grids */
        'bento-4': '2fr 1fr 1fr 1fr',
        'bento-3': '2fr 1fr 1fr',
      }
    }
  },
  plugins: []
};
