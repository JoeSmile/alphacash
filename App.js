import { useEffect, useRef, useState } from "react";
import "react-native-gesture-handler";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme, Platform } from "react-native";
import { useInitialStore } from "@hooks/useInitialStore";
import { QueryClient, QueryClientProvider, focusManager } from "react-query";
import { useAppState } from "@hooks/useAppState";
import { useOnlineManager } from "@hooks/useOnlineManager";
import { Provider } from "@ant-design/react-native";
import { initDataTrack } from "@utils/dataTrack";

initDataTrack();

function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient();

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  useInitialStore();

  const timer = useRef(null);
  const [count, setCount] = useState(5);
  useEffect(() => {
    if (isLoadingComplete) {
      timer.current = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    }

    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [isLoadingComplete]);

  useEffect(() => {
    if (count < 0) {
      timer.current && clearInterval(timer.current);
      timer.current = null;
    }
  }, [count]);

  return (
    <SafeAreaProvider>
      {count > 0 ? (
        <View style={styles.container}>
          <ImageBackground
            style={{ flex: 1 }}
            source={require("./assets/splash.png")}
          >
            <View style={styles.countDown}>
              <Text style={styles.countText}>{count}</Text>
            </View>
            <Text style={styles.license}>License No:xxxxxxxxxxxxxx</Text>
          </ImageBackground>
        </View>
      ) : (
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Navigation colorScheme={colorScheme} />
          </Provider>
          <StatusBar />
        </QueryClientProvider>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0825B8",
    position: "relative",
  },
  bg: {
    flex: 1,
  },
  countDown: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    fontSize: 14,
    width: 28,
    height: 28,
    position: "absolute",
    top: 32,
    right: 28,
  },
  countText: {
    color: "white",
    textAlign: "center",
    lineHeight: 28,
  },
  license: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    position: "absolute",
    bottom: 60,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
});
