/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          900: "#0B0B12",
          800: "#121121",
          700: "#181730",
          card: "#1A1930",
          border: "#262445",
        },
        brand: {
          50: "#F0EEFF",
          100: "#DAD4FF",
          200: "#B5A9FF",
          300: "#8F7DFF",
          400: "#7161FF",
          500: "#5B4BFF",
          600: "#4A3CE0",
          700: "#3A2EB8",
          800: "#2B2290",
        },
        accent: {
          pink: "#E96BD8",
          blue: "#5BA8FF",
          green: "#49E0A6",
          orange: "#FF9A5A",
          red: "#FF6B6B",
        },
        ink: {
          50: "#FFFFFF",
          100: "#E7E5F4",
          200: "#BDB9D6",
          300: "#8B86A8",
          400: "#5E5A7A",
          500: "#3E3B56",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 40px rgba(113, 97, 255, 0.25)",
        card: "0 10px 30px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7161FF 0%, #5B4BFF 50%, #E96BD8 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(113,97,255,0.15), rgba(233,107,216,0.10))",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
