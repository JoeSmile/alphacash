import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { getAsyncParams } from "@apis/commonParameter/common";
import { getUserQuota } from "@apis";
import { useSystemStore, useUserQuota } from "@store";

export function useLoadedAssets() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [setCashLoan] = useUserQuota((s) => [s.setCashLoan]);

  const [app, sign, l, token] = useSystemStore((s) => [
    s.app,
    s.sign,
    s.locale,
    s.token,
  ]);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync(Ionicons.font);
        getAsyncParams(); // 取异步公共参数的，没有用await了，因为拿不到也没关系。不能阻塞APP进入
        const data = await getUserQuota({
          app,
          sign,
          l,
          t: Date.now() + "",
          token,
        }); // 保证进入Home页不闪，优化体验
        console.log("cashloan: ", data.data);
        const cashLoan = data?.data?.data?.cashLoan;
        if (cashLoan) {
          setCashLoan(cashLoan);
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
