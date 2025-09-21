/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2E7D32',      // calm green to match logo
          secondary: '#0E7490',    // muted teal/cyan for gradients
          accent: '#84CC16',       // lime accent used sparingly
          muted: '#F0FDF4',        // very light green background
          dark: '#0F172A',
        },
      },
    },
  },
  plugins: [],
};
