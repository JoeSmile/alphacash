import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Processing from "./Processing";
import Completed from "./Completed";
import { useI18nStore } from "@hooks/useI18nStore";

const renderScene = SceneMap({
  Processing: Processing,
  Completed: Completed,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const { i18n } = useI18nStore();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Processing", title: i18n.t("processing") },
    { key: "Completed", title: i18n.t("completed") },
  ]);

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
