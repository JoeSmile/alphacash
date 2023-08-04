import "react-native-gesture-handler";

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
// import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AppEventsLogger } from "react-native-fbsdk-next";

if (Platform.OS !== "web") {
// Log standard event. e.g. completed registration
  AppEventsLogger.logEvent(AppEventsLogger.AppEvents.CompletedRegistration, {
    [AppEventsLogger.AppEventParams.RegistrationMethod]: "email",
  });
}
// const { status } = await requestTrackingPermissionsAsync();

// Settings.initializeSDK();

// if (status === 'granted') {
//     await Settings.setAdvertiserTrackingEnabled(true);
// }

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
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Navigation colorScheme={colorScheme} />
          </Provider>
          <StatusBar />
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}
