
import Job from "@screens/Account/screens/Credentials/Job";
import Emergency from "@screens/Account/screens/Credentials/Emergency";
import Certificate from "@screens/Account/screens/Credentials/Certificate";
import Personal from '@screens/Account/screens/Credentials/Personal'

export const CredentialsScreens = [
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
