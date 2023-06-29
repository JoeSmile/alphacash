import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import {useSystemStore} from './store/useSystemStore';
import {useI18nStore, i18n} from '@hooks/useI18nStore'
import { useEffect } from "react";

import { isDev } from "@const/config";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  useSystemStore()
  const locale = useI18nStore(s => s.locale)
  useEffect(() => {
    i18n.locale = locale
  }, [])
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
