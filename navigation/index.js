// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Text } from 'react-native';
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import Start from "../screens/Start";
import Login from "../screens/Login";
import Apply from "../screens/Apply";
import FaceDetectionScreen from "../screens/Apply/screens/FaceDetectionScreen";
import { AddNewAccount } from '@screens/Account/screens/MyCards/AddNewAccount';
import { useI18n, LocaleTypes } from "@hooks/useI18n";

import { MineScreens } from './MineNavigator';
import { CredentialsScreens } from './CredentialsNavigator';
import { MyCardsScreens } from './MyCardsNavigator';
import { SettingsScreens } from './SettingNavigator';

import { pageHeader } from "@styles";

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
  const {locale, setLocale, i18n} = useI18n()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Start" component={Start}  options={{
           ...pageHeader
        }}/>
        <Stack.Screen name="Login" component={Login}  options={{
           ...pageHeader
        }}/>

        <Stack.Screen name="Apply" component={Apply}  options={{
           ...pageHeader,
           headerTitle: 'Apply',
           headerShown: true
        }}/>
         <Stack.Screen name="FaceDetectionScreen" component={FaceDetectionScreen}  options={{
           ...pageHeader,
           headerTitle: 'Face Recognition',
           headerShown: true
        }}/>
          <Stack.Screen name="AddNewAccount" component={AddNewAccount}  options={{
           ...pageHeader,
           headerTitle: 'Add Collection Account',
           headerShown: true
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
            options={({navigation}) => {
              return {
                headerTitle: i18n.t(screen.headerTitle),
                headerShown: !!screen.headerTitle,
                headerLeft: () => {
                  return (
                    <Pressable
                      onPress={() => {
                        screen.goto ? 
                        navigation.push(screen.goto) : 
                        navigation.goBack()
                      }}>
                        <Text style={{
                          color: 'white',
                          padding: 20,
                          fontSize: 16
                        }}>{`<-`}</Text>
                    </Pressable>
                  )
                },
                ...pageHeader
              }
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
