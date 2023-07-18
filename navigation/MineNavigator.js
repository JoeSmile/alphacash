import Settings from "@screens/Settings";
import { BillsNavigator } from "./BillsNavigator";
import Credentials from "@screens/Account/screens/Credentials";
import ContactUs from "@screens/Account/screens/ContactUs";
import MyCards from "@screens/Account/screens/MyCards/index";

export const MineScreens = [
  {
    name: "Bills",
    component: BillsNavigator,
  },
  {
    name: "Credentials",
    component: Credentials,
    headerTitle: "Account",
  },
  {
    name: "MyCards",
    component: MyCards,
    headerTitle: 'Collection Account'
  },
  {
    name: "ContactUs",
    component: ContactUs,
    headerTitle: "联系我们",
  },
  {
    name: "Settings",
    component: Settings,
    headerTitle: "设置",
  },
];
