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
        background: '#121212',
        card: '#1E1E1E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
      },
      borderRadius: {
        '4xl': '16px',
      },
    },
  },
  plugins: [],
}
