/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#5f6fff',
      },
      gridTemplateColumns:{
        'auto' : 'repeat(auto-fill, minmax(180px, 1fr))',
      }
    },
  },
  plugins: [],
}