/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        cormorant: ['Cormorant Garamond', 'serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        cormorantInfant: ['Cormorant Infant', 'serif'],
      }
    },
  },
  plugins: [],
}

