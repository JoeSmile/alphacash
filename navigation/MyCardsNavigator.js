import { createStackNavigator } from "@react-navigation/stack";

import MyCards from "@screens/Account/screens/MyCards/index";
import CardForm from "@screens/Account/screens/MyCards/CardForm";

const MyCardsStack = createStackNavigator();

const MyCardsScreens = [
  {
    name: "MyCards",
    component: MyCards,
    headerTitle: "收款账号",
  },
  {
    name: "CardForm",
    component: CardForm,
    headerTitle: "添加收款账号",
  },
];

export function MyCardsNavigator() {
  return (
    <MyCardsStack.Navigator>
      {MyCardsScreens.map((screen) => (
        <MyCardsStack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerTitle: screen.headerTitle,
            headerShown: !!screen.headerTitle,
          }}
          component={screen.component}
        />
      ))}
    </MyCardsStack.Navigator>
  );
}
