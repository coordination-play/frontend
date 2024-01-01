/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        text: {
          DEFAULT: "hsl(var(--text))",
          inverse: "hsl(var(--text-inverse))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",

        sky: "hsl(var(--sky))",
        pink: "hsl(var(--pink))",

        navy: "hsl(var(--navy))",
        blueSky: "hsl(var(--blueSky))",

        lightPink: "hsl(var(--lightPink))",
        violet: "hsl(var(--violet))",

        orange: "hsl(var(--orange))",
        lightRed: "hsl(var(--lightRed))",

        lightGreen: "hsl(var(--lightGreen))",
        darkGreen: "hsl(var(--darkGreen))",

        magenta: "hsl(var(--magenta))",
        red: "hsl(var(--red))",

        grey: "#FFFFFF33",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        DEFAULT: "76.98px",
      },
      boxShadow: {
        DEFAULT: "inset 0px 0px 22px 0px rgba(255, 255, 255, 0.6)",
        inputInner: "inset 0px 0px 40px 0px rgba(255, 255, 255, 0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
