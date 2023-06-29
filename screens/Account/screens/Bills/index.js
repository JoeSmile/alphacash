import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Processing from "./Processing";
import Completed from "./Completed";
import { useI18n } from "@hooks/useI18n";

const renderScene = SceneMap({
  Processing: Processing,
  Completed: Completed,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const { i18n } = useI18n();
  const [index, setIndex] = React.useState(0);
  
  const routes = React.useMemo(() => [
    { key: "Processing", title: i18n.t("processing") },
    { key: "Completed", title: i18n.t("completed") },
  ],[i18n])

  return (
    <View
      style={{
        paddingTop: "40px",
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
