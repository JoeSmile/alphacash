import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import { RepayRemind } from "./RepayRemind";
import FList from "@components/FList";
const data = [
  {
    id: "1",
    title: "还款提醒",
    leftItem: RepayRemind,
    displayIcon: false,
  },
  {
    id: "2",
    title: "语言设置",
    screen: "Language",
  },
  {
    id: "3",
    title: "隐私协议",
    screen: "PrivatePolicy",
  },
  {
    id: "4",
    title: "当前版本",
    displayIcon: false,
    leftItem: () => {
      return (
        <>
          <Text>当前版本：</Text>
          <Text>1.0.0</Text>
        </>
      );
    },
  },
];

const Settings = () => {
  return (
    <View>
      <FList data={data} />
    </View>
  );
};

export default Settings;
