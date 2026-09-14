/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        modelscale: {
          // Cream palette
          paper:   { DEFAULT: '#F5F3EE', 2: '#EEEAE1', 3: '#E7E2D6' },
          ink:     { DEFAULT: '#0B0B0D', 2: '#3A3A3F', 3: '#7A7A82', 4: '#B5B2AA' },
          rule:    { DEFAULT: 'rgba(11,11,13,0.08)', strong: 'rgba(11,11,13,0.16)' },
          // Warm accent replaces old brand blue
          accent:  { DEFAULT: '#FF5B2E', hover: '#E44A20', tint: 'rgba(255,91,46,0.08)', glow: 'rgba(255,91,46,0.28)' },
          // Kept for backwards-compat with any lingering references
          blue:    { DEFAULT: '#FF5B2E', hover: '#E44A20', light: '#FF7F5C', glow: 'rgba(255,91,46,0.28)' },
          dark:    { DEFAULT: '#0B0B0D', surface: '#0B0B0D', card: '#FDFCF9', elevated: '#FFFFFF', border: 'rgba(11,11,13,0.08)', muted: '#7A7A82' },
          yellow:  { DEFAULT: '#F2C4A6', warm: '#F5D3B7' }
        }
      },
      fontFamily: {
        sans:    ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display':  ['clamp(3.25rem, 11.5vw, 11.5rem)', { lineHeight: '0.88', letterSpacing: '-0.035em', fontWeight: '400' }],
        'headline': ['clamp(2.5rem, 5.5vw, 4.75rem)',   { lineHeight: '0.98', letterSpacing: '-0.02em',  fontWeight: '400' }],
        'title':    ['clamp(1.5rem, 2vw, 2rem)',        { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '500' }],
        'lead':     ['clamp(1rem, 1.05vw + 0.5rem, 1.25rem)', { lineHeight: '1.55', fontWeight: '400' }],
        'body':     ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        'caption':  ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label':    ['0.6875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.14em' }],
      },
      spacing: { '18':'4.5rem','22':'5.5rem','26':'6.5rem','30':'7.5rem','34':'8.5rem','38':'9.5rem','42':'10.5rem','46':'11.5rem' },
      animation: {
        'marquee':     'marquee 40s linear infinite',
        'marquee-slow':'marquee 55s linear infinite',
        'marquee-r':   'marquee-r 45s linear infinite',
        'fade-up':     'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in':     'fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in':    'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft':  'pulse-soft 4s ease-in-out infinite',
        'float':       'float 8s ease-in-out infinite',
        'blink':       'blink 1.1s steps(2) infinite',
      },
      keyframes: {
        marquee:     { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-r': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
        'fade-up':   { '0%': { opacity: '0', transform: 'translateY(32px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in':  { '0%': { opacity: '0', transform: 'scale(0.94)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'pulse-soft':{ '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        float:       { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        blink:       { '50%': { opacity: '0' } },
      },
      transitionTimingFunction: {
        'spring':  'cubic-bezier(0.22, 1, 0.36, 1)',
        'snappy':  'cubic-bezier(0.4, 0, 0.2, 1)',
        'reveal':  'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: { '400':'400ms', '600':'600ms', '800':'800ms' },
      boxShadow: {
        'glow-accent':    '0 0 24px -6px rgba(255,91,46,0.55)',
        'glow-accent-lg': '0 0 48px -10px rgba(255,91,46,0.5)',
        'card-lift':      '0 30px 60px -30px rgba(11,11,13,0.15)',
        'inset-top':      'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: { 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))' },
      gridTemplateColumns: { 'bento-4': '2fr 1fr 1fr 1fr', 'bento-3': '2fr 1fr 1fr' }
    }
  },
  plugins: []
};
