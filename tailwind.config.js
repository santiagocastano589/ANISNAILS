/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        studio: {
          blush: '#FDF2F2',
          pink: '#F7CAD0',
          roseGold: '#D4A373',
          gold: '#C5A059',
          champagne: '#FAEDCD',
          dark: '#1C1917',
          charcoal: '#292524',
          mauve: '#9381FF',
          cream: '#FEFAE0',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #ECC880 0%, #D4A373 50%, #B88346 100%)',
        'rose-gradient': 'linear-gradient(135deg, #FDE2E4 0%, #FAD2E1 50%, #E2ECE9 100%)',
      }
    },
  },
  plugins: [],
};
