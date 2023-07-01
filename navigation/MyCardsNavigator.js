import { createStackNavigator } from "@react-navigation/stack";
import CardForm from "@screens/Account/screens/MyCards/CardForm";

export const MyCardsScreens = [
  {
    name: "CardForm",
    component: CardForm,
    headerTitle: "添加收款账号",
  },
];