/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        forsa: {
          navy: '#1a3a6e',
          blue: '#1e40af',
          yellow: '#f59e0b',
          'yellow-light': '#fcd34d',
        }
      }
    },
  },
  plugins: [],
}
