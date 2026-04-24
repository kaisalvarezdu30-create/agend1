/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B1020',
        surface: '#121932',
        card: '#1A2244',
        'card-2': '#222C55',
        border: '#2A3566',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        pitch: {
          DEFAULT: '#16A34A',
          dark: '#166534',
          light: '#4ADE80',
        },
        ball: {
          DEFAULT: '#F59E0B',
          dark: '#B45309',
          light: '#FCD34D',
        },
        sport: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
      },
      borderRadius: {
        '4xl': '20px',
        '5xl': '28px',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-pitch': '0 10px 30px -10px rgba(34, 197, 94, 0.45)',
        'glow-ball': '0 10px 30px -10px rgba(245, 158, 11, 0.45)',
        'glow-sport': '0 10px 30px -10px rgba(59, 130, 246, 0.45)',
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'pitch-gradient': 'linear-gradient(135deg, #166534 0%, #16A34A 50%, #22C55E 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0B1020 0%, #1A2244 40%, #166534 120%)',
        'ball-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      },
      animation: {
        'bounce-soft': 'bounce-soft 2.4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pop': 'pop 0.25s ease-out',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
