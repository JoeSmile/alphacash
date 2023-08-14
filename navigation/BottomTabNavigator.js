// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import Homepage from "../screens/Homepage";
import { useI18n } from "@hooks/useI18n";
import { pageHeader } from "../styles/pageHeader";
import Account from "../screens/Account";
import { doTrack } from "@utils/dataTrack";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const { i18n } = useI18n();
  const { showModal = false } = route?.params || {};

  return (
    <BottomTab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme].tint
        tabBarActiveTintColor: "#0825B8", // 选中状态下的字体颜色
        tabBarInactiveTintColor: "#8899AC", // 未选中状态下的字体颜色
      }}
    >
      <BottomTab.Screen
        name="HomePage"
        component={HomePageNavigator}
        initialParams={{ showModal }}
        listeners={{
          tabPress: (e) => {
            doTrack("pk14", 1);
          },
        }}
        options={{
          title: i18n.t("Home"),
          headerShown: false,
          ...pageHeader,
          tabBarIcon: ({ focused, color }) => {
            const iconSource = focused
              ? require("@assets/images/tab_ic_home_sel.png")
              : require("@assets/images/tab_ic_home_nor.png");
            return (
              <Image source={iconSource} style={{ width: 26, height: 26 }} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        listeners={{
          tabPress: (e) => {
            doTrack("pk39", 1);
          },
        }}
        options={{
          title: i18n.t("Mine"),
          headerShown: false,
          ...pageHeader,
          tabBarIcon: ({ focused, color }) => {
            const iconSource = focused
              ? require("@assets/images/tab_ic_mine_sel.png")
              : require("@assets/images/tab_ic_mine_nor.png");
            return (
              <Image source={iconSource} style={{ width: 26, height: 26 }} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomePageStack = createStackNavigator();

function HomePageNavigator({ route }) {
  const { showModal = false } = route?.params || {};
  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen
        name="Homepage"
        component={Homepage}
        initialParams={{ showModal }}
        options={{
          headerTitle: "AlphaCash",
          headerShown: false,
          ...pageHeader,
        }}
      />
    </HomePageStack.Navigator>
  );
}
