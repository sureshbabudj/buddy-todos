/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ["./dist/*.html"],
  content: ["./src/**/*.{html,js,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
