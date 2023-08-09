module.exports = ({ config }) => ({
  name: "AlphaCash",
  slug: "financeexpo", // 这个不要动，要跟expo网站上项目的名称一致
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
    bundleIdentifier: "com.alphacash.easy.credit.loan.paisa",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.alphacash.easy.credit.loan.paisa",
    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "ACCESS_BACKGROUND_LOCATION",
      "READ_CALENDAR",
      "WRITE_CALENDAR",
      "QUERY_ALL_PACKAGES",
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  scheme: "alphacash", // 这个只能小写
  runtimeVersion:
    process.env.ENV === "dev"
      ? {
          policy: "sdkVersion",
        }
      : "0.1.0",
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
    "expo-calendar",
    "expo-location",
    //"expo-applist",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
      },
    ],
    [
      "react-native-fbsdk-next",
      {
        appID: "644423131050994",
        clientToken: "1c78cf3a59f5d9c9f3b69bf16f150cae",
        displayName: "AlphaCash",
        scheme: "fb644423131050994",
        advertiserIDCollectionEnabled: true,
        autoLogAppEventsEnabled: true,
        isAutoInitEnabled: true,
        iosUserTrackingPermission:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
  ],
  extra: {
    ENV: process.env.ENV,
    eas: {
      projectId: "462bceb9-15ba-4d76-bcad-d93ef54c4c31", // for sunhao
    },
  },
});
