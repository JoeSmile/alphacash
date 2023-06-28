import Account from "../screens/Account";
import { createStackNavigator } from "@react-navigation/stack";

import { SettingsNavigator } from "./SettingNavigator";
import { MyCardsNavigator } from "./MyCardsNavigator";
import { BillsNavigator } from "./BillsNavigator";
import { CredentialsNavigator } from "./CredentialsNavigator";

import ContactUs from "@screens/Account/screens/ContactUs";

const MineStack = createStackNavigator();

const MineScreens = [
  {
    name: "Account",
    component: Account,
    headerTitle: "我的",
  },
  {
    name: "Bills",
    component: BillsNavigator,
  },
  {
    name: "Credentials",
    component: CredentialsNavigator,
  },
  {
    name: "MyCards",
    component: MyCardsNavigator,
  },
  {
    name: "ContactUs",
    component: ContactUs,
    headerTitle: "联系我们",
  },
  {
    name: "Settings",
    component: SettingsNavigator,
    headerShown: false,
  },
];

export function MineNavigator() {
  return (
    <MineStack.Navigator>
      {MineScreens.map((screen) => (
        <MineStack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerTitle: screen.headerTitle,
            headerShown: !!screen.headerTitle,
          }}
          component={screen.component}
        />
      ))}
    </MineStack.Navigator>
  );
}
