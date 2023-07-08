import Constants from "expo-constants";

const baseURL = {
  dev: "https://alphacashapi.tangbull.com",
  prod: "prod",
}[Constants.expoConfig.extra.ENV];

const isDev = Constants.expoConfig.extra.ENV === "dev";

export { baseURL, isDev };
