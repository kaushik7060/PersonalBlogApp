/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'cursor-blink': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 0.7s linear infinite',
      },
    },
  },
  plugins: [],
}