import { createStackNavigator } from "@react-navigation/stack";

import Bills from "@screens/Account/screens/Bills";
import BillDetail from "@screens/Account/screens/Bills/BillDetail";
import { useI18n } from "@hooks/useI18n";
import { pageHeader } from "@styles";

const BillsStack = createStackNavigator();

export const BillsScreens = [
  {
    name: "CurrentBills",
    component: Bills,
    headerTitle: "Current Bill",
  },
  {
    name: "BillDetail",
    component: BillDetail,
    headerTitle: "Bill Detail",
  },
];

export function BillsNavigator() {
  const { i18n } = useI18n();

  return (
    <BillsStack.Navigator>
      {BillsScreens.map((screen) => (
        <BillsStack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerTitle: i18n.t(screen.headerTitle),
            headerShown: !!screen.headerTitle,
            ...pageHeader,
          }}
          component={screen.component}
        />
      ))}
    </BillsStack.Navigator>
  );
}
