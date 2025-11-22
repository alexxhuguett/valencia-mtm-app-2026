/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          rsc: {
            green: '#B5C99A', // Sage Green
            blue: '#7A9EBD',  // Muted Blue
            cream: '#F5F5F0', // Background Cream
            text: '#2C3E50',  // Dark Blue-Grey for text
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }