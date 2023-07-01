import { View, Text, Pressable } from "react-native";

export default function PersonalInfo({navigation}) {
  return (
    <View>
      <Pressable onPress={() => navigation.push("Credentials")}>
        <Text>PersonalInfo</Text>

      </Pressable>
    </View>
  );
}
