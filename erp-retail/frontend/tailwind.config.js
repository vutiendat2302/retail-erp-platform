/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // quét toàn bộ file trong src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00897B',    // Indigo
        secondary: '#6b7280',  // Gray
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
  ],
}
