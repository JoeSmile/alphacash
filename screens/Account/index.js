import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import FList from "@components/FList";
import UserLayout from "@components/UserLayout";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle, getMarginRightOrLeft, getRTLView } from '@styles';

const Item = (item) => {
  const { i18n, locale } = useI18n();
  return (
    <View style={[styles.item, getRTLView(locale)]}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={[{
          width: 32,
          height: 32,
        }, getMarginRightOrLeft(locale, 12)]}
      />
      <Text>{i18n.t(item.title)}</Text>
    </View>
  );
};

const data = [
  {
    title: "Bill",
    trackName: "pk43",
    screen: "CurrentBills",
    leftIcon: require("@assets/images/mine_ic_bill.png"),
    leftItem: Item,
    requireLogin: true,
  },
  {
    title: "Certification Info",
    //trackName: "pk43",
    screen: "Credentials",
    leftIcon: require("@assets/images/mine_ic_certification_info.png"),
    leftItem: Item,
    requireLogin: true,
  },
  {
    title: "Collection Account",
    trackName: "pk1",
    screen: "MyCards",
    leftIcon: require("@assets/images/mine_ic_my_bank_card.png"),
    leftItem: Item,
    requireLogin: true,
  },
  {
    title: "Contact Us",
    trackName: "pk18",
    screen: "ContactUs",
    leftIcon: require("@assets/images/mine_ic_contact_us.png"),
    leftItem: Item,
  },
  {
    title: "Settings",
    trackName: "pk11",
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

      {!isLogin && (
        <View
          style={{
            transform: [{ translateY: -50 }],
            alignItems: "center",

            paddingHorizontal: 15,
          }}
        >
          <Pressable
            style={{
              width: "100%",
              backgroundColor: "#0825B8",
              borderRadius: 3,
            }}
            onPress={() => {
              navigation.push("Login");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                height: 48,
                lineHeight: 46,
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              {i18n.t("Log In")}
            </Text>
          </Pressable>
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },
  text: {
    color: "white",
  },
});

export default Account;
