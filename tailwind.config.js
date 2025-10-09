/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f19", // deep indigo background
        card: "rgba(255,255,255,0.06)",
        accent: "#8b5cf6", // violet
        accent2: "#06b6d4", // cyan
        glow: "rgba(139,92,246,0.25)", // soft glow
      },
      backgroundImage: {
        "animated-gradient":
          "linear-gradient(-45deg, #0f172a, #1e293b, #0b0f19, #111827)",
      },
      animation: {
        gradientShift: "gradientShift 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 6s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(139,92,246,0.3)",
        soft: "0 4px 30px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
