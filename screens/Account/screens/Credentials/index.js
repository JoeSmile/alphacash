import { View, Text } from "react-native";
import FList from "@components/FList";
const data = [
  {
    title: "个人信息",
    screen: "Personal",
  },
  {
    title: "工作信息",
    screen: "Job",
  },
  {
    title: "紧急联系人",
    screen: "Emergency",
  },
  {
    title: "Certificate",
    screen: "Certificate",
  },
];

export default function Credentials() {
  return (
    <View>
      <FList data={data} />
    </View>
  );
}
