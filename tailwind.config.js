/** @type {import('tailwindcss').Config} */


module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        periwinkle: {
          DEFAULT: "#becefd",
          100: "#031856",
          200: "#052fac",
          300: "#134cf8",
          400: "#698dfa",
          500: "#becefd",
          600: "#ccd8fd",
          700: "#d8e2fe",
          800: "#e5ecfe",
          900: "#f2f5ff",
        },
        navy_blue: {
          DEFAULT: "#00007f",
          100: "#00001a",
          200: "#000033",
          300: "#00004d",
          400: "#000066",
          500: "#00007f",
          600: "#0000cc",
          700: "#1a1aff",
          800: "#6666ff",
          900: "#b3b3ff",
        },
        penn_blue: {
          DEFAULT: "#00165a",
          100: "#000512",
          200: "#000925",
          300: "#000e37",
          400: "#001249",
          500: "#00165a",
          600: "#002caf",
          700: "#0443ff",
          800: "#5882ff",
          900: "#abc0ff",
        },
        egyptian_blue: {
          DEFAULT: "#36369a",
          100: "#0b0b1f",
          200: "#16163e",
          300: "#21215d",
          400: "#2b2b7c",
          500: "#36369a",
          600: "#4d4dc0",
          700: "#7979d0",
          800: "#a6a6e0",
          900: "#d2d2ef",
        },
        vista_blue: {
          DEFAULT: "#819ffe",
          100: "#01124c",
          200: "#022597",
          300: "#0237e3",
          400: "#3564fd",
          500: "#819ffe",
          600: "#9ab1fe",
          700: "#b3c5fe",
          800: "#cdd8fe",
          900: "#e6ecff",
        },
      },
    },

    fontFamily: {
      libre: ['"Pacifico"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
