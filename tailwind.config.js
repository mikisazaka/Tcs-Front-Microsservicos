/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          light: '#ce7e5d',
          dark: '#a2543d'
        },
        beige: {
          light: '#f7d1ba'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
