import { View, Text } from "react-native";
import BillList from "./BillList";

export default function Processing() {
  const bills = [
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Text>
        <BillList bills={bills} />
      </Text>
    </View>
  );
}
