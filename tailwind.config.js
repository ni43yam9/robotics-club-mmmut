/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    // Disable preflight to avoid breaking existing vanilla CSS module layouts
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
