/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#A691F2',
        green: '#d2d481',
        yellow: '#F2B66D',
        orange: '#F2916D',
        turquoise: '#00D5FF',
      },
    },
  },
  plugins: [],
}

