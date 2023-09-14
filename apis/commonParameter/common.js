import { Dimensions } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as ExpoApplist from "expo-applist";
import * as Battery from "expo-battery";
//import { Camera } from "expo-camera";

export const commonParams = {
  wifi_ssid: "", //wifi名称 例如: public_5G
  cell_info: "", // 包含手机基站列表和cId,lac,psc等信息
  screen_width: (Dimensions.get("window").width || "") + "", // 屏幕宽度
  screen_height: (Dimensions.get("window").height || "") + "", // 屏幕高度
  phone_moved: "0", // 是否在移动
  wifi_mac: "", // wifi mac地址例如：0e:9b:4b:bb:c9:69
  battery: "", // 剩余电量
  disk_space: (Device.totalMemory || "") + "", // 总存储空间
  free_space: "", // 剩余存储空间
  is_charging: "", // 是否在充电
  af_id: "", // Appflyer的UId，获取方式 AppsFlyerLib.getInstance().getAppsFlyerUID(Utils.getApp()
  app: "alphacash", // app名字：例如ugkash
  b: Device.brand || "", // 手机品牌
  c: Device.manufacturer || "", // 渠道
  gaid: "", // 谷歌广告id
  is_root: "0", // 手机是否root
  l: "", // 语言
  la: "", // 纬度
  lo: "", // 经度
  m: Device.modelName || "", // 手机型号
  os: Device.osName || "", // 手机系统
  r: (Device.osVersion || "") + "", // android系统版本；例如 11，12，13
  sdk: (Device.platformApiLevel || "") + "", // android sdk api系统版本；例如 30，31，32
  simulator: "0", // 是否是模拟器
  t: "", // 时间戳
  token: "", // 用户登录token
  v: "1.0.0", // 应用版本号：例如：1.0.0
  // sign: '', // 签名sign
  instance_i: "", // 去掉-firebase的参数
};

export const getAsyncParams = async () => {
  try {
    Battery.getPowerStateAsync().then((batteryInfo) => {
      let { batteryLevel, batteryState } = batteryInfo;
      commonParams.battery =
        batteryLevel === -1 ? "unknow" : (batteryLevel * 100).toFixed();
      commonParams.is_charging =
        batteryState === Battery.BatteryState.CHARGING ? "1" : "0";
    });

    //下面的代码验证无效，直接注释掉了
    //Camera.getCameraPermissionsAsync().then((status) => {
    //  if (!status) {
    //    commonParams.simulator = "1";
    //  }
    //});

    const locPermission = await Location.requestForegroundPermissionsAsync();
    if (locPermission?.status !== "granted") {
      return;
    }

    // getCurrentPositionAsync有时候会stuck，等待3s，取不到就算了
    const loc = await Promise.race([
      //Location.getCurrentPositionAsync({
      //  accuracy: Location.Accuracy.Balanced,
      //}),
      ExpoApplist.getLocation(),
      new Promise((resolve) => {
        setTimeout(() => resolve(), 3000);
      }),
    ]);

    console.log("location got:", loc);

    if (loc) {
      commonParams.la = "" + loc.latitude;
      commonParams.lo = "" + loc.longitude;
    }
  } catch (err) {}
};
