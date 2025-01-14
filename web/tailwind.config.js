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
    }
  },

  plugins: [
    function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.4xl"),
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: theme("letterSpacing.tight"),
          color: theme("colors.dark-green"),
          fontFamily: theme("fontFamily.montserrat"),
          paddingTop: theme("spacing.4"),
          paddingBottom: theme("spacing.4"),
        },
      });
    },
  ],
};
