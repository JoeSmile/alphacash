import { createStackNavigator } from "@react-navigation/stack";
import {pageHeader} from "@styles";

import Credentials from "@screens/Account/screens/Credentials";
import Personal from "@screens/Account/screens/Credentials/Personal";
import Job from "@screens/Account/screens/Credentials/Job";
import Emergency from "@screens/Account/screens/Credentials/Emergency";
import Certificate from "@screens/Account/screens/Credentials/Certificate";

const CredentialStack = createStackNavigator();

const CredentialsScreens = [
  {
    name: "Credentials",
    component: Credentials,
    headerTitle: "Credentials",
  },
  {
    name: "Personal",
    component: Personal,
    headerTitle: "Personal Info",
  },
  {
    name: "Job",
    component: Job,
    headerTitle: "Job",
  },
  {
    name: "Emergency",
    component: Emergency,
    headerTitle: "Emergency",
  },
  {
    name: "Certificate",
    component: Certificate,
    headerTitle: "Certificate",
  },
];

export function CredentialsNavigator() {
  return (
    <CredentialStack.Navigator>
      {CredentialsScreens.map((screen) => (
        <CredentialStack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerTitle: screen.headerTitle,
            headerShown: !!screen.headerTitle,
            ...pageHeader
          }}
          component={screen.component}
        />
      ))}
    </CredentialStack.Navigator>
  );
}
