/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tile-light': '#ffcfa3',
        'tile-dark': '#d48d4e',
        'tile-highlight': '#fff5db',
        'tile-capture': '#ff4766'
      }
    },
  },
  plugins: [],
};

