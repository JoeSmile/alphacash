/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Homepage: {
        screens: {
          HomePage: {
            screens: {
              name: "homepage",
            },
          },
          Mine: {
            screens: {
              name: "account",
            },
          },
        },
      },
      Account: {
        screens: {
          Bills: {
            screens: {
              name: "bills",
            },
          },
          Credentials: {
            screens: {
              name: "Credentials",
            },
          },
          MyCards: {
            screens: {
              CardForm: {
                screens: {
                  name: "cardform",
                },
              },
            },
          },
          ContactUs: {
            screens: {
              name: "contactus",
            },
          },
          Settings: {
            screens: {
              Language: {
                screens: {
                  name: "language",
                },
              },
              PrivatePolicy: {
                screens: {
                  name: "privatepolicy",
                },
              },
            },
          },
        },
      },
      Start: {
        screens: {
          Setting: {
            screens: {
              Start: "start",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
