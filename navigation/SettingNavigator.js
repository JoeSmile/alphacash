 import { createStackNavigator } from "@react-navigation/stack";

import { Language } from "@screens/Settings/Language";
import { PrivatePolicy } from "@screens/Settings/PrivatePolicy";

export const SettingsScreens = [

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
