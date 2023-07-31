import Settings from "@screens/Settings";
import Credentials from "@screens/Account/screens/Credentials";
import ContactUs from "@screens/Account/screens/ContactUs";
import MyCards from "@screens/Account/screens/MyCards/index";

export const MineScreens = [
  {
    name: "Credentials",
    component: Credentials,
    headerTitle: "Certification Info",
  },
  {
    name: "MyCards",
    component: MyCards,
    headerTitle: "Collection Account",
  },
  {
    name: "ContactUs",
    component: ContactUs,
    headerTitle: "Contact Us",
  },
  {
    name: "Settings",
    component: Settings,
    headerTitle: "Settings",
  },
];
