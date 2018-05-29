module.exports = {
  extends: "airbnb", // for React
  env: {
    node: true,
    browser: true,
  },
  parser: "babel-eslint",
  rules: {
    quotes: ["error", "double"],
    "no-console": 0,
    "no-plusplus": 0,
    "react/jsx-filename-extension": 0,
  },
};
