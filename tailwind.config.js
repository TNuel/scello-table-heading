/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // nunito: ['Nunito', 'sans'],
        // circular: ['circular-std', 'sans'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        borderColor: "#C6C2DE",
        textColor: "#25213B",
        tertiary: "#6E6893",
        shadowColor: "#8B83BA",
        bgColor: "#F2F0F9",
        primary: "#6D5BD0",
        secondary: "#4DE897",
        success: "#007F00",
        negative: "#D30000",
      },
    },
  },
  plugins: [],
}

