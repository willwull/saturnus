module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
  ],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": 0,
    "no-plusplus": 0,
    "react/jsx-filename-extension": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/media-has-caption": 0,
    "react/no-danger": 0,
    "react/sort-comp": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "object-curly-newline": 0,
    "no-underscore-dangle": 0,
    "react/prefer-stateless-function": 0,
    "prefer-destructuring": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-expressions": [
      "error",
      {
        allowTaggedTemplates: true,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
  },
};
