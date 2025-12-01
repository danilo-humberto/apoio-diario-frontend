/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F5FAFF",
        primary: "#7BB8F5",
        secondary: "#B8F2C8",
      },
    },
  },
  plugins: [],
};
