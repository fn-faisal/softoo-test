/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: '#d946ef',
      muted: '#71717a'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
