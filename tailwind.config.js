/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'pigment-green': '#019B4C',
        'mint-cream': '#F1F7EC',
        'arylide-yellow': '#EDD851',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        serif: ['"Lato"', 'serif'],
      },
    },
  },
  plugins: [],
};
