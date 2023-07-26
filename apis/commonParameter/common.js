import * as Location from "expo-location";

export const commonParams = {
  wifi_ssid: "", //wifi名称 例如: public_5G
  cell_info: "", // 包含手机基站列表和cId,lac,psc等信息
  screen_width: "", // 屏幕宽度
  screen_height: "", // 屏幕高度
  phone_moved: "", // 是否在移动
  wifi_mac: "", // wifi mac地址例如：0e:9b:4b:bb:c9:69
  battery: "", // 剩余电量
  disk_space: "", // 总存储空间
  free_space: "", // 剩余存储空间
  is_charging: "", // 是否在充电
  af_id: "", // Appflyer的UId，获取方式 AppsFlyerLib.getInstance().getAppsFlyerUID(Utils.getApp()
  app: "alphacash", // app名字：例如ugkash
  b: "", // 手机品牌
  c: "", // 渠道
  gaid: "", // 谷歌广告id
  is_root: "", // 手机是否root
  l: "", // 语言
  la: "", // 纬度
  lo: "", // 经度
  m: "", // 手机型号
  os: "", // 手机系统
  r: "", // android系统版本；例如 11，12，13
  sdk: "", // android sdk api系统版本；例如 30，31，32
  simulator: "", // 是否是模拟器
  t: "", // 时间戳
  token: "", // 用户登录token
  v: "", // 应用版本号：例如：1.0.0
  // sign: '', // 签名sign
  instance_i: "", // 去掉-firebase的参数
};

export const getAppLocation = (() => {
  let loc;
  let retLoc = {
    la: "", // 纬度
    lo: "", // 经度
  };
  return async () => {
    if (loc && Date.now() - loc.timestamp <= 5 * 60 * 1000 * 1000) {
      return retLoc;
    }
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return retLoc;
      }

      loc = await Location.getCurrentPositionAsync({});
      retLoc = {
        la: "" + loc.coords.latitude,
        lo: "" + loc.coords.longitude,
      };
    } catch (err) {
      console.log("get location err: ", err);
    }

    return retLoc;
  };
})();
