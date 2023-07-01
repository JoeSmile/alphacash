// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import Start from "../screens/Start";
import Login from "../screens/Login";
import { pageHeader } from "@styles";
import { MineScreens } from './MineNavigator';
import { CredentialsScreens } from './CredentialsNavigator';
import { MyCardsScreens } from './MyCardsNavigator';
import { SettingsScreens } from './SettingNavigator';

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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Start" component={Start}  options={{
           ...pageHeader
        }}/>
        <Stack.Screen name="Login" component={Login}  options={{
           ...pageHeader
        }}/>
      </Stack.Group>

      <Stack.Screen name="Homepage" component={BottomTabNavigator} />
      {
        [
          ...MineScreens, 
          ...CredentialsScreens, 
          ...MyCardsScreens, 
          ...SettingsScreens
        ].map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={{
              headerTitle: screen.headerTitle,
              headerShown: !!screen.headerTitle,
              ...pageHeader
            }}
            component={screen.component}
          />
        ))
      }
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: "Oops!",
          ...pageHeader
        }}
      />
    </Stack.Navigator>
  );
}
