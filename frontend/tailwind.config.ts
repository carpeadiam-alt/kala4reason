/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        instrumentSans: ["var(--font-instrument-sans)", "sans-serif"],
        instrumentSerif: ["var(--font-instrument-serif)", "serif"],
      },
    },
  },
  plugins: [],
};
