/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#262335",
        secondary: "#f9FAFB",
        accent: "#D1D5DB",
      },
    },
  },
  plugins: [],
}