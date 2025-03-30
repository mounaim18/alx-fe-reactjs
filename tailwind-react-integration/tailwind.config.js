/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or'media' or 'class'
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
