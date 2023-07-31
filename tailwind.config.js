/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'xmd':'1100px',

      'lg': '1124px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1436px',
      // => @media (min-width: 1536px) { ... }
    },
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

