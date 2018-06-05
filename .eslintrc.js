module.exports = {
  extends: "airbnb", // for React
  env: {
    node: true,
    browser: true,
  },
  parser: "babel-eslint",
  rules: {
    quotes: ["error", "double"],
    "arrow-parens": ["error", "as-needed"],
    "no-console": 0,
    "no-plusplus": 0,
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "import/prefer-default-export": 0,
    "function-paren-newline": 0,
    "jsx-a11y/media-has-caption": 0,
    "react/no-danger": 0,
    "react/sort-comp": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
  },
};
