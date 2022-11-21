/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts,tsx}"],
  theme: {
    extend: {
      zIndex:{
        '100': '100'
      },
      colors: {
        black: "#050505",
        white: "#FEFEFE",
      },
      keyframes: {
        wave: {
          "2%": { transform: "translateX(1)" },
          "25%": { transform: "translateX(-25%)" },
          "50%": { transform: "translateX(-50%)" },
          "75%": { transform: "translateX(-25%)" },
          "100%": { transform: "translateX(1)" },
        },
      },
      animation: {
        "wave-0": "wave 10s -3s linear infinite",
        "wave-1": "wave 18s linear reverse infinite",
        "wave-2": "wave 20s -1s reverse infinite",
      },
    },
  },
}
