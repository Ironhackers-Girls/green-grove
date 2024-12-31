/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lime-green': '#CFF57F',  
        'dark-green': '#125548',
      },
    },
  },
  plugins: [],
}
