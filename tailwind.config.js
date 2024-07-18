/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    // fontFamily: {
    //   'sans': ['Quicksand', 'sans-serif']
    //   // 'sans': ['Baloo 2', 'sans-serif']
    //   // 'sans': ['Fredoka', 'sans-serif']
    // },
    extend: {
      backgroundImage: {
        "home": "url('/assets/img-home-bg-dark.png')"
      }
    },
  },
  plugins: [],
}

