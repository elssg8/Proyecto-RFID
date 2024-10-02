/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        open: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-90deg)' },
        },
        close: {
          '0%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
      },
      animation: {
        open: 'open 2s forwards',
        close: 'close 2s forwards',
      },
    },
  },
  plugins: [],
}

