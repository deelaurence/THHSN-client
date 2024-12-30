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
        'mygray-gradient': 'linear-gradient(to bottom, #e8e8e8, #c8c8c8)',
      },
      screens: {
        tablet: { raw: '(min-width: 600px) and (max-width: 1025px) and (min-height: 800px) and (max-height: 1369px)' },
      },
      fontFamily: {
        queens: ['queens', 'sans-serif'],
      },
      colors: {
        primary: {
          // light: '#343333', // Lighter shade for hover or light mode
          // light: '#304245',
          // superlight:'#1B2723', // Lighter shade for hover or light mode
          // DEFAULT: '#000f0a', 
          // DEFAULT: '#292929', 
          DEFAULT: '#151a13',
            // DEFAULT: '#1f271b',
            // light: '#222d1f',   // Slightly lighter shade
            light: '#1b2218',   // Slightly lighter shade
            dark: '#1e3a8a',    // Darker shade for focus or dark mode
        },
        secondary: {
          light: '#faf9f8',   // Slightly lighter version of the default
          DEFAULT: '#f2edeb', // Your default color
          darker:'#eae6e4',
          dark: '#a89d97',  
          veryDark: '#4f4641' // Very dark version
        },
        mygray:{
          DEFAULT:'#e8e8e8'
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
  plugins: [
    function ({ addUtilities, e }) {
      // Rainbow Text Utilities
      addUtilities(
        {
          '.rainbow-text': {
            backgroundImage: 'linear-gradient(to right, #de8500, #856afc)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text', // Safari support
            color: 'transparent',
          },
          [`.${e('dark-rainbow-text')}`]: {
            backgroundImage: 'linear-gradient(to right, #de8500, #856afc)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text', // Safari support
            color: 'transparent',
          },
        },
        ['responsive', 'hover'] // Enables responsive and hover variants
      );

      // Radial Gradient Background Utilities
      addUtilities(
        {
          '.radial-gradient-bg': {
            backgroundImage:
              'radial-gradient(circle, rgba(230, 150, 30, 0.526) 0%, transparent 100%)',
          },
          [`.${e('dark-radial-gradient-bg')}`]: {
            backgroundImage:
              'radial-gradient(circle, rgba(30, 150, 230, 0.526) 0%, transparent 100%)',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
