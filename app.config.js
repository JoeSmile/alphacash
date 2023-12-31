module.exports = ({ config }) => ({
  name: "AlphaCash",
  slug: "financeexpo", // 这个不要动，要跟expo网站上项目的名称一致
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#0825B8",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.alphacash.easy.credit.loan.paisa",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },
    //splash: {
    //  image: "./assets/splash.png",
    //  resizeMode: "cover",
    //  backgroundColor: "#0825B8",
    //},
    package: "com.alphacash.easy.credit.loan.paisa",
    permissions: [
      "ACCESS_COARSE_LOCATION",
      "READ_CALENDAR",
      "WRITE_CALENDAR",
      "QUERY_ALL_PACKAGES",
    ],
    blockedPermissions: [
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.READ_MEDIA_IMAGES",
      "android.permission.READ_CONTACTS",
      "android.permission.READ_PHONE_NUMBERS",
      "android.permission.READ_MEDIA_VIDEO",
      "android.permission.READ_MEDIA_AUDIO",
      "android.permission.WRITE_EXTERNAL_STORAGE",
      "android.permission.RECORD_AUDIO",
      "android.permission.MODIFY_AUDIO_SETTINGS",
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
      : "0.0.8",
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
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
      },
    ],
    ["react-native-appsflyer", { shouldUseStrictMode: false }],
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
    "react-native-compressor",
  ],
  extra: {
    ENV: process.env.ENV,
    eas: {
      projectId: "462bceb9-15ba-4d76-bcad-d93ef54c4c31", // for sunhao
    },
  },
});
