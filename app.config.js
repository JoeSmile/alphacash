module.exports = ({ config }) => ({
  name: "financeexpo",
  slug: "financeexpo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.alphacash.easy.credit.loan.paisa",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  scheme: "financeexpo",
  runtimeVersion:
    process.env.ENV === "dev"
      ? {
          policy: "sdkVersion",
        }
      : "0.0.2",
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/462bceb9-15ba-4d76-bcad-d93ef54c4c31",
  },
  plugins: [
    "expo-localization",
    [
      "expo-document-picker",
      {
        iCloudContainerEnvironment: "Production",
      },
    ],
  ],
  extra: {
    ENV: process.env.ENV,
    eas: {
      // projectId: "c5ed18ff-989f-4bed-934b-ccce0c4d67f5", // for qinghua
      projectId: "462bceb9-15ba-4d76-bcad-d93ef54c4c31", // for sunhao
    },
  },
});
