/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx}'], // Include only JSX and TSX files
  theme: {
    extend: {
      colors: {
        'custom-purple': '#9933CC', // Add your custom color
      },
    },
  },
  plugins: [],
}