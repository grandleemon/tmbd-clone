module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'raw': '(max-width: 480px)'},
        'tablet': {'raw': '(min-width: 481px) and (max-width: 768px)'},
      }
    },
  },
  plugins: [],
}
