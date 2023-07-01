// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

import Homepage from "../screens/Homepage";
import { useI18n } from "@hooks/useI18n";

import { MineNavigator } from "./MineNavigator";
import { pageHeader } from "../styles/pageHeader";
import Account from "../screens/Account";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const {i18n} = useI18n()

  return (
    <BottomTab.Navigator
      initialRouteName="HomePage"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="HomePage"
        component={HomePageNavigator}
        options={{
          title: i18n.t("homepage"),
          headerShown: false,
          ...pageHeader,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: i18n.t("mine"),
          headerShown: false,
          ...pageHeader,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomePageStack = createStackNavigator();

function HomePageNavigator() {
  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen
        name="Homepage"
        component={Homepage}
        options={{ headerTitle: "首页",
        ...pageHeader
        }}
 
      />
    </HomePageStack.Navigator>
  );
}
