/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 Color System
      colors: {
        bg: "#05070F", // deep night background
        card: "rgba(255,255,255,0.05)", // translucent glass
        accent: "#8b5cf6", // violet
        accent2: "#06b6d4", // cyan
        glow: "rgba(139,92,246,0.25)", // soft violet glow
        danger: "#f43f5e", // rose accent for errors
      },

      // 🌈 Backgrounds & Gradients
      backgroundImage: {
        "animated-gradient":
          "linear-gradient(-45deg, #0f172a, #1e293b, #0b0f19, #111827)",
        "glass-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        "accent-gradient":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },

      // 🌠 Shadows & Depth
      boxShadow: {
        glow: "0 0 30px rgba(139,92,246,0.3)",
        glowCyan: "0 0 30px rgba(6,182,212,0.3)",
        soft: "0 4px 30px rgba(0,0,0,0.4)",
        card: "0 4px 50px rgba(0,0,0,0.25)",
      },

      // 🧊 Blur, Border, and Glass
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },

      // ⚡ Animations & Keyframes
      animation: {
        gradientShift: "gradientShift 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        glowPulse: "glowPulse 4s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(139,92,246,0.15)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(139,92,246,0.35)",
          },
        },
      },

      // 📱 Responsive Fine-Tuning
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // 🧠 Typography
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // for consistent input/select styling
    require("@tailwindcss/typography"), // for better text rendering
  ],
};
