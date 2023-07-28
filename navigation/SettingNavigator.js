 import { createStackNavigator } from "@react-navigation/stack";

import { Language } from "@screens/Settings/Language";
import { PrivatePolicyScreen } from "@screens/Settings/PrivatePolicy";

export const SettingsScreens = [

  {
    name: "Language",
    component: Language,
    headerTitle: "Language",
  },
  {
    name: "PrivatePolicy",
    component: PrivatePolicyScreen,
    headerTitle: "Privacy Policy",
  },
];
