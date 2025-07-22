/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/renderer/index.html',
    './src/renderer/App.tsx',
    './src/renderer/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'subtle-bounce': 'subtle-bounce 1.5s ease-in-out infinite',
      },
      keyframes: {
        'subtle-bounce': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        },
      },
    },
  },
  plugins: [],
}; 