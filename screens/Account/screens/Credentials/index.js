import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import FList from "@components/FList";
import { useGetUserFormStatus } from '@apis';
import { useEffect, useState } from "react";

const Item = (item) => {
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
      <Text>{item.title}</Text>
    </View>
  );
};

const listItems = [
  {
    title: "个人信息",
    screen: "Personal",
    leftIcon: require("@assets/images/mine_ic_personal_info.png"),
    leftItem: Item,
  },
  {
    title: "工作信息",
    screen: "Job",
    leftIcon: require("@assets/images/mine_ic_wok_info.png"),
    leftItem: Item,
  },
  {
    title: "紧急联系人",
    screen: "Emergency",
    leftIcon: require("@assets/images/mine_ic_reference_contact.png"),
    leftItem: Item,
  },
  {
    title: "Certificate",
    screen: "Certificate",
    leftIcon: require("@assets/images/mine_ic_identity_info.png"),
    leftItem: Item,
  },
];

export default function Credentials() {
  const { mutate: getUserFormStatus, data, isLoading } = useGetUserFormStatus();
  const [displayItems, setDisplayItems] = useState(listItems);

  useEffect(() => {
    getUserFormStatus()
  }, []);

  useEffect(() => {
    if (data && data.data.error_code == 1) {
      const status = data.data.data;
   
      if (status.isCompletedPersonal) {
        listItems[0].rightIcon = require('/assets/images/checked.png');
      } 
      if (status.isCompletedWork) {
        listItems[1].rightIcon = require('/assets/images/checked.png');
      } 
      if (status.isCompletedContact) {
        listItems[2].rightIcon = require('/assets/images/checked.png');
      } 
      if (status.isCompletedIdentity) {
        listItems[3].rightIcon = require('/assets/images/checked.png');
      }
      setDisplayItems([...listItems])
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.itemsContainer}>
      <FList data={displayItems} itemStyle={styles.FList} />
    </SafeAreaView>
  );
}

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
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 30,
    borderRadius: 4,
    boxShadow:
      "1px 1px 3px 0 rgba(0, 0, 0, 0.1),1px 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  text: {
    color: "white",
  },
});
