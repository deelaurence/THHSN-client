/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
      },
      colors: {
        primary: {
          light: '#343333', // Lighter shade for hover or light mode
          // DEFAULT: '#000f0a', 
          DEFAULT: '#292929', 
          // DEFAULT: '#171717',
          dark: '#1e3a8a',    // Darker shade for focus or dark mode
        },
        secondary: {
          light: '#faf9f8',   // Slightly lighter version of the default
          DEFAULT: '#f2edeb', // Your default color
          dark: '#a89d97',  
          veryDark: '#4f4641' // Very dark version
        },
        success: {
          light: '#559b98',
          DEFAULT: '#10b981',
          dark: '#047857',
        },
        danger: {
          light: '#fecaca',
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
        customGray: {
          light: '#f3f4f6',
          DEFAULT: '#9ca3af',
          dark: '#4b5563',
        },
      },
      animation: {
          'scale-up4': 'scale-up4 1s linear infinite',
        },
      keyframes: {
          'scale-up4': {
            '20%': {
              backgroundColor: '#ffffff',
              transform: 'scaleY(1.5)',
            },
            '40%': {
              transform: 'scaleY(1)',
            },
          },
    },}
  },
  plugins: [],
};
