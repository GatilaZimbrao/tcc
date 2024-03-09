/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  variants: {
    extend: {
      borderColor: ["first"],
      borderWidth: ["first"],
    },
  },
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          100: "#F3F3F3",
          200: "#E7E7E7",
          300: "#B7B7B7",
          400: "#707070",
          500: "#2A2A2A",
          600: "#111111",
          700: "#0E0C0C",
          800: "#0C0809",
          900: "#090506",
        },
        brand: {
          100: "#cedbe5",
          200: "#9db6cb",
          300: "#6c92b2",
          400: "#3b6d98",
          500: "#0a497e",
          600: "#083a65",
          700: "#062c4c",
          800: "#041d32",
          900: "#020f19",
        },
        success: {
          300: "#2AD16D",
          500: "#25B860",
          900: "#209E53",
        },
        error: {
          300: "#FF5C5C",
          500: "#F64545",
          900: "#DB3D3D",
        },
        warning: {
          300: "#FFA633",
          500: "#FF9000",
          900: "#E58200",
        },

        link: "#3F6AD8",
      },

      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        outline: "0 0 0 3px var(--tw-shadow-color)",
        default: "0px 0px 10px 2px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
