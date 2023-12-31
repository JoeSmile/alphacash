module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@assets": "./assets",
            "@store": "./store",
            "@screens": "./screens",
            "@hooks": "./hooks",
            "@apis": "./apis",
            "@styles": "./styles",
            "@const": "./constants",
            "@utils": "./utils",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      ["import", { libraryName: "@ant-design/react-native" }],
    ],
  };
};
