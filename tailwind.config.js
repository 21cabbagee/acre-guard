/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f7fee7',
          500: '#84cc16',
          600: '#65a30d',
          900: '#365314',
        }
      }
    },
  },
  plugins: [],
}
