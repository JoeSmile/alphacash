import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Image } from "react-native";

import Bills from "@screens/Account/screens/Bills";
import BillDetail from "@screens/Account/screens/Bills/BillDetail";
import { useI18n } from "@hooks/useI18n";
import { pageHeader } from "@styles";

const BillsStack = createStackNavigator();

export const BillsScreens = [
  {
    name: "CurrentBills",
    component: Bills,
    headerTitle: "Bill",
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
          options={({ navigation }) => ({
            headerTitle: i18n.t(screen.headerTitle),
            headerShown: !!screen.headerTitle,
            headerLeft: () => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    source={require("@assets/images/com_nav_ic_back_white.png")}
                    style={{
                      marginLeft: 12,
                      width: 21,
                      height: 21,
                    }}
                  ></Image>
                </Pressable>
              );
            },
            ...pageHeader,
          })}
          component={screen.component}
        />
      ))}
    </BillsStack.Navigator>
  );
}
