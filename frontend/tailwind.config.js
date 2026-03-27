/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #0D9488, #22C55E)",
        "custom-gradient-2": "linear-gradient(to left, #0D9488, #22C55E)",
        "card-gradient": "linear-gradient(to right, #0D9488, #22C55E)",
      },
      colors: {
        primary: "#0D9488",
        secondary: "#22C55E",
        background: "#ECFDF5",
        text: "#1E293B",
        accent: "#F87171",
        navbarColor: "#0D9488",
        btnColor: "#0D9488",
        linkColor: "#0D9488",
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat"],
      },
    },
  },

  variants: {
    extend: {
      backgroundImage: ["responsive"],
    },
  },

  plugins: [],
};