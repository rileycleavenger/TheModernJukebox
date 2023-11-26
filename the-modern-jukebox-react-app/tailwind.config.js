/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        //periwinkle
        "gray-200": "#AEB8FE",
        //periwinkle
        "gray-300": "#D7DBFF",
        "gray-500": "#5E0000",
        // black
        "primary-100": "#240A09",
        // off black
        "secondary-100": "#210812",
        // light purple
        "primary-200": "#A582BC",
        // dark purple 
        "primary-300": "#8653A0",
        // dark dark purple
        "secondary-300": "#3B3561",
        // light orange 
        "primary-400": "#F9A217",
        // dark orange
        "primary-500": "#EF7A20",
        // light red
        "primary-600": "#FFCD5B",
        // off light red
        "secondary-600": "#E15151",
        // dark red
        "primary-700": "#D32425",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred":
          "linear-gradient(90deg, #8653A0 0%, #240A09 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};