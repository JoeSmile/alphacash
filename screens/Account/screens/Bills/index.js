import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Processing from "./Processing";
import Completed from "./Completed";
import { useI18n } from "@hooks/useI18n";

const mockBills = [
  {
    loanId: "11111",
    getAmount: "6000",
    loanTerm: "7",
    applyDate: "07/07/2023",
    appStatus: 101,
    dueDate: "07/07/2024",
    repaymentDate: "07/17/2023",
  },
  {
    loanId: "22222",
    getAmount: "6000",
    loanTerm: "7",
    applyDate: "07/07/2023",
    appStatus: 102,
    dueDate: "07/07/2024",
    repaymentDate: "07/17/2023",
  },
  {
    loanId: "33333",
    getAmount: "6000",
    loanTerm: "7",
    applyDate: "07/07/2023",
    appStatus: 201,
    dueDate: "07/07/2024",
    repaymentDate: "07/17/2023",
  },
  {
    loanId: "4444",
    getAmount: "76000",
    loanTerm: "7",
    applyDate: "07/07/2023",
    appStatus: 501,
    dueDate: "07/07/2024",
    repaymentDate: "07/17/2023",
  },
];

const renderScene = SceneMap({
  processing: Processing,
  completed: Completed,
});

export default function BillList() {
  const layout = useWindowDimensions();
  const { i18n } = useI18n();
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
    />
  );

  return (
    <View
      style={{
        paddingHorizontal: 15,
        flex: 1,
      }}
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
