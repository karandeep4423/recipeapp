const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      screens:{
        'largesc':'1460px',
        'lap':'925px'

      },
      fontFamily:{
        'Lora':['Lora'],
        'Heebo':['Heebo'],
        'Roboto':['Roboto'],
        'Bebas Neue':['Bebas Neue'],
        'Inter':['Inter']
      }
    },
    
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
          
          '.scrollbar::-webkit-scrollbar': {
              width: '17px',
              borderRadius:'10px'
          },
          '.scrollbar::-webkit-scrollbar-thumb': {
              backgroundColor: theme('colors.red.500'),
              borderRadius:'10px ',
              border:'2px solid transparent',
              width: '20px',
              backgroundClip:'content-box',
             
          },
          '.scrollbar::-webkit-scrollbar-track-piece': {
              backgroundColor: theme('transparent'),
              marginBlock:'8px'
          },
      });
  }),
  ],
}
