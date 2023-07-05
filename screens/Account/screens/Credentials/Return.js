
import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";

export default function Return() {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Text style={{ color: '#4F5E6F', textAlign: 'center', marginVertical: 15, height:30 }}>Return</Text>
    </Pressable>
  )
}