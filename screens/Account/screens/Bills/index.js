import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Processing from "./Processing";
import Completed from "./Completed";
import { doTrack } from "@utils/dataTrack";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle, getMarginRightOrLeft } from '@styles';

const renderScene = SceneMap({
  processing: Processing,
  completed: Completed,
});

export default function BillList() {
  const layout = useWindowDimensions();
  const { i18n, locale } = useI18n();
  const [index, setIndex] = React.useState(0);

  const routes = React.useMemo(
    () => [
      { key: "processing", title: i18n.t("Current Bill") },
      { key: "completed", title: i18n.t("Old Bill") },
    ],
    [i18n]
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#0825B8" }}
      indicatorContainerStyle={{
        height: 2,
        backgroundColor: "#E0E3E8",
        top: 48,
      }}
      pressColor={"transparent"}
      style={{ backgroundColor: "transparent", marginBottom: 8 }}
      renderLabel={({ route, focused }) => (
        <Text style={{ color: focused ? "#0A233E" : "#8899AC", fontSize: 16 }}>
          {route.title + ""}
        </Text>
      )}
      onTabPress={({ route }) => {
        if (route.key === "completed") {
          doTrack("pk34", 1);
        }
      }}
    />
  );
  return (
    <View
      style={[{
        paddingHorizontal: 15,
        flex: 1,
      }, getWritingDirectionStyle(locale)]}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
