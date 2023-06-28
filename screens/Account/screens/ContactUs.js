import { View, Text } from "react-native";
import FList from "@components/FList";
const data = [
  {
    title: "在线客服(推荐)",
  },
  {
    title: "联系邮箱： xxxx@gmail.com",
  },
  {
    title: "联系电话： xxxxx",
    displayIcon: false,
    leftItem: (item) => {
      return (
        <>
          <Text>{item.title}</Text>
          <Text>拨打</Text>
        </>
      );
    },
  },
];

export default function ContactUs() {
  return (
    <View>
      <FList data={data} />
      <Text>
        Key Executive For Loan Handling officer Name：xxxxxxx Conact
        Email:XXXXXX@com
      </Text>
    </View>
  );
}
