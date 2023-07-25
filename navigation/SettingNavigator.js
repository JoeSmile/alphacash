 import { createStackNavigator } from "@react-navigation/stack";

import { Language } from "@screens/Settings/Language";
import { PrivatePolicyScreen } from "@screens/Settings/PrivatePolicy";

export const SettingsScreens = [

  {
    name: "Language",
    component: Language,
    headerTitle: "语言设置",
  },
  {
    name: "PrivatePolicy",
    component: PrivatePolicyScreen,
    headerTitle: "隐私协议",
  },
];
