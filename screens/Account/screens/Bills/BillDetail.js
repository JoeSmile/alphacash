import { View, Text } from "react-native";

export default function BillDetail({ route }) {
  const { title } = route.params;
  return (
    <View>
      <Text>BillDetail {title}</Text>
    </View>
  );
}
