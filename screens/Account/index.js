import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import FList from "@components/FList";
import UserLayout from "@components/UserLayout";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n } from "@hooks/useI18n";

const Item = (item) => {
  const { i18n } = useI18n();
  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={{
          width: 32,
          height: 32,
          marginRight: 12,
        }}
      />
      <Text>{i18n.t(item.title)}</Text>
    </View>
  );
};

const data = [
  {
    title: "Bill",
    screen: "Bills",
    leftIcon: require("@assets/images/mine_ic_bill.png"),
    leftItem: Item,
  },
  {
    title: "Certification Info",
    screen: "Credentials",
    leftIcon: require("@assets/images/mine_ic_certification_info.png"),
    leftItem: Item,
  },
  {
    title: "Collection Account",
    screen: "MyCards",
    leftIcon: require("@assets/images/mine_ic_my_bank_card.png"),
    leftItem: Item,
  },
  {
    title: "Contact Us",
    screen: "ContactUs",
    leftIcon: require("@assets/images/mine_ic_contact_us.png"),
    leftItem: Item,
  },
  {
    title: "Settings",
    screen: "Settings",
    leftIcon: require("@assets/images/mine_ic_settings.png"),
    leftItem: Item,
  },
];

const Account = ({ navigation }) => {
  const { i18n } = useI18n();
  const [isLogin, setToken] = useSystemStore((s) => [!!s.token, s.setToken]);
  return ( 
    <UserLayout>
      <View style={styles.itemsContainer}>
        <FList data={data} itemStyle={styles.FList} />
      </View>

      {
        !isLogin &&  <View
              style={{
                transform: [{ translateY: -50 }],
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  width: "75%",
                  backgroundColor: "#0825B8",
                  borderRadius: 3,
                }}
                onPress={() => {
                  isLogin ? setToken("") : navigation.push("Login");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    borderRadius: 3,
                    height: 46,
                    lineHeight: 46,
                    color: "#FFFFFF",
                    backgroundColor: "#0825B8",
                    fontSize: 15,
                  }}
                >
                  {isLogin ? i18n.t('Log In') : "i18n.t('Log Out')"}
                </Text>
              </Pressable>
            </View>
      }
     
    </UserLayout>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  itemsContainer: {
    margin: 15,
    transform: [{ translateY: -50 }],

  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    boxShadow:
      "1px 1px 3px 0 rgba(0, 0, 0, 0.1),1px 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  text: {
    color: "white",
  },
});

export default Account;
