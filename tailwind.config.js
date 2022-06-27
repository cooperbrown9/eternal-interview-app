module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    // Use this in prod
    // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      container: {
        center: true,
        // padding: '4rem',
        fontFamily: 'Calibri'
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  