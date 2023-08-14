import "react-native-gesture-handler";
import { Text } from "react-native";
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
  if (!isLoadingComplete) {
    return null;
    //return <Text>hhh</Text>;
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
