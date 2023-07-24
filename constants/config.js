import Constants from "expo-constants";

//const baseURL = {
//  dev: "https://alphacashapi.tangbull.com",
//  prod: "prod",
//}[Constants.expoConfig.extra.ENV];
const baseURL = "https://alphacashapi.tangbull.com";

const isDev = Constants.expoConfig.extra.ENV === "dev";

export { baseURL, isDev };
