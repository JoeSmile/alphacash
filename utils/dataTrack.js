import { Platform } from "react-native";
import { AppEventsLogger /*Settings*/ } from "react-native-fbsdk-next";
import appsFlyer from "react-native-appsflyer";

export function initDataTrack() {
  // https://github.com/thebergamo/react-native-fbsdk-next/#expo-installation
  // Moreover, on iOS you need user consent to collect user data

  // import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
  // const { status } = await requestTrackingPermissionsAsync();

  // Settings.initializeSDK();

  // if (status === 'granted') {
  //     await Settings.setAdvertiserTrackingEnabled(true);
  // }

  console.log("process.env.ENV", process.env.NODE_ENV);
  if (Platform.OS !== "web") {
    appsFlyer.initSdk(
      {
        devKey: "Q2tmzNXKUNFKkGKhCu6UJY",
        isDebug: true,
        appId: "41*****44", // only for ios
      },
      (res) => {
        console.log("appFlyer init success: ", JSON.stringify(res));
      },
      (err) => {
        console.error("appFlyer init error: ", JSON.stringify(err));
      }
    );
  }
}

export function doTrack(name, value) {
  console.log("doTrack: ", name);
  if (Platform.OS !== "web") {
    AppEventsLogger.logEvent(name, { name: value });
    appsFlyer.logEvent(
      name,
      { name: value },
      (res) => {
        console.log("appFlyer report success: ", JSON.stringify(res));
      },
      (err) => {
        console.error("appFlyer report error: ", JSON.stringify(err));
      }
    ); // 3:success  4:error
  }
}
