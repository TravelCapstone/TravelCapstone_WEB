/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   montserrat: ["Montserrat", "sans-serif"],
      // },
      colors: {
        mainColor: "#008489",
        // primary: "#00c3c7",
        primary: "#0287a8",
        secondary: "#00c3c7",
        dark: "#ffcf22",
      },
      fontSize: {
        14: "14px",
        18: "18px",
        24: "24px",
        32: "32px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
}