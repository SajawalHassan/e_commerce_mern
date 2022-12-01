/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontSize: {
      xs: "8px",
      small: "12px",
      medium: "18px",
      large: "25px",
    },
    colors: {
      dgray: "#D9D9D9",
      black: "#000000",
      white: "#FFFFFF",
      gray: "#565656",
      blue: "#699BF7",
      red: "#F24E1E",
    },
  },
  plugins: [],
};
