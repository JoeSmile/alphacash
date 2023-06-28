import { createStackNavigator } from "@react-navigation/stack";

import Settings from "@screens/Settings";
import { Language } from "@screens/Settings/Language";
import { PrivatePolicy } from "@screens/Settings/PrivatePolicy";

const SettingsStack = createStackNavigator();

const SettingsScreens = [
  {
    name: "Settings",
    component: Settings,
    headerTitle: "设置",
  },
  {
    name: "Language",
    component: Language,
    headerTitle: "语言设置",
  },
  {
    name: "PrivatePolicy",
    component: PrivatePolicy,
    headerTitle: "隐私协议",
  },
];

export function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      {SettingsScreens.map((screen) => (
        <SettingsStack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerTitle: screen.headerTitle,
            headerShown: screen.headerShow,
          }}
          component={screen.component}
        />
      ))}
    </SettingsStack.Navigator>
  );
}
