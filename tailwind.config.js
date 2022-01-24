module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'raw': '(max-width: 480px)'},
        'tablet': {'raw': '(min-width: 481px) and (max-width: 768px)'},
        'smallpc': {'raw': '(min-width: 769px) and (max-width: 1024px)'},
        'mdpc': {'raw': '(min-width: 1025px) and (max-width: 1800px)'},
        'otherpc': {'raw': '(min-width: 1801px) and (max-width: 9999px)'},
      }
    },
  },
  plugins: [],
}
