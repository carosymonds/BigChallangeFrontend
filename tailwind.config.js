/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'retro': ['"Roboto Mono"', 'monospace']
      },
      spacing: {
        'sidebar-space':"25%"
      }
    },
  },
  plugins: [],
}