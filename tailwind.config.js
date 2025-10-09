/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#071020", // main background color (deep navy)
        card: "rgba(255,255,255,0.04)", // translucent glass cards
        accent: "#3b82f6", // soft blue accent
        accent2: "#10b981", // teal accent for glow
      },
      backgroundImage: {
        "gradient-glow":
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.1), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.25)",
        soft: "0 4px 30px rgba(0,0,0,0.3)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
