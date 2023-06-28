module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "universe",
    "eslint:recommended",
    "@react-native-community",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": false,
  },
};
