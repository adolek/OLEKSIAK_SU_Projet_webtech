/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        
        primary: {
          light: '#6d6d6d',
          main: '#1b1b1b', 
          dark: '#1b1b1b',
          contrastText: '#000'
        },
        secondary: {
          light: '#ffff5a',
          main: '#ffff00',
          dark: '#c7cc00',
          contrastText: '#000'
        }
      
        
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-font-inter"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
