/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',      // For pages
    './components/**/*.{js,ts,jsx,tsx}', // For components
    './src/app/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}', 
 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

