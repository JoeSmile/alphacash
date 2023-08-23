// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Text, Image } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import Start from "../screens/Start";
import Login from "../screens/Login";
import FaceDetectionScreen from "../screens/Apply/screens/FaceDetectionScreen";
import { AddNewAccount } from "@screens/Account/screens/MyCards/AddNewAccount";
import { useI18n, LocaleTypes } from "@hooks/useI18n";


import Repay from "../screens/Repay/Repay";
import RepayList from "../screens/Repay/RepayList";
import RepayDemo from "../screens/Repay/RepayDemo";



import { MineScreens } from "./MineNavigator";
import { CredentialsScreens } from "./CredentialsNavigator";
import { MyCardsScreens } from "./MyCardsNavigator";
import { SettingsScreens } from "./SettingNavigator";
import { BillsScreens } from "./BillsNavigator";
import { ApplyScreen } from "./ApplyNavigator";
import { LoanAgreementScreen } from "./LoanAgreementNavigator";



import { pageHeader } from "@styles";

const HeaderLeft = ({navigation}) => {
  return  <Pressable
  onPress={() => {
    navigation.goBack()
  }}
>
  <Image
    source={require("@assets/images/com_nav_ic_back_white.png")}
    style={{
      marginLeft: 12,
      width: 21,
      height: 21,
    }}
  />
</Pressable>
}


export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  const { locale, setLocale, i18n } = useI18n();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Group>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            ...pageHeader,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            ...pageHeader,
          }}
        />
        <Stack.Screen
          name="FaceDetectionScreen"
          component={FaceDetectionScreen}
          options={{
            ...pageHeader,
            headerTitle: "Face Recognition",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AddNewAccount"
          component={AddNewAccount}
          options={({ navigation }) => {
            return  {
            ...pageHeader,
            headerTitle: "Add Collection Account",
            headerLeft: () => <HeaderLeft navigation={navigation}/>,
            headerShown: true,
          }
          }}
        />
        {/* 还款 */}
        <Stack.Screen
          name="RepayList"
          component={RepayList}
          options={({navigation}) => {
            return {
              ...pageHeader,
              headerTitle: "Repay",
              headerShown: true,
              headerLeft: () => <HeaderLeft navigation={navigation}/>,
            }
          }}
        />
         <Stack.Screen
          name="Repay"
          component={Repay}
          options={({navigation}) => {
            return {
              ...pageHeader,
              headerTitle: "Repay",
              headerShown: true,
              headerLeft: () => <HeaderLeft navigation={navigation}/>,
            }
          }}
        />
        <Stack.Screen
          name="RepayDemo"
          component={RepayDemo}
          options={({navigation}) => {
            return {
              ...pageHeader,
              headerTitle: "Repay",
              headerShown: true,
              headerLeft: () => <HeaderLeft navigation={navigation}/>,
            }
          }}
        />

      </Stack.Group>

      <Stack.Screen name="Homepage" component={BottomTabNavigator} />
      
      {[
        ...MineScreens,
        ...CredentialsScreens,
        ...MyCardsScreens,
        ...SettingsScreens,
        ...BillsScreens,
        ...ApplyScreen,
        ...LoanAgreementScreen,
      ].map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={({ navigation }) => {
            return {
              headerTitle: i18n.t(screen.headerTitle),
              headerShown: !!screen.headerTitle,
              headerLeft: () => <HeaderLeft navigation={navigation}/>,
              ...pageHeader,
            };
          }}
        />
      ))}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: "Oops!",
          ...pageHeader,
        }}
      />
    </Stack.Navigator>
  );
}
