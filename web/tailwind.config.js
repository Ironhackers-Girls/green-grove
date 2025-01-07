/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-black": "#0E0E0E",
        "my-white": "#FFFFFF",
        "my-gray": "#F5F5F5",
        "lime-green": "#CFF57F",
        "dark-green": "#125548",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
   gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
  },
  plugins: [],
};
