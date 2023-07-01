import { createStackNavigator } from "@react-navigation/stack";

import Bills from "@screens/Account/screens/Bills";
import BillDetail from "@screens/Account/screens/Bills/BillDetail";

const BillsStack = createStackNavigator();

export const BillsScreens = [
  {
    name: "Bills",
    component: Bills,
    headerTitle: "账单",
  },
  {
    name: "BillDetail",
    component: BillDetail,
    headerTitle: "账单详情",
  },
];

export function BillsNavigator() {
  return (
    <BillsStack.Navigator>
      {BillsScreens.map((screen) => (
        <BillsStack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerTitle: screen.headerTitle,
            headerShown: !!screen.headerTitle,
          }}
          component={screen.component}
        />
      ))}
    </BillsStack.Navigator>
  );
}
