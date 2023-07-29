
import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";
import { useI18n } from "@hooks/useI18n";

export default function Return() {
  const navigation = useNavigation();
  const { i18n } = useI18n();

  return (
    <Pressable onPress={() => navigation.replace('Credentials')}>
      <Text style={{ color: '#4F5E6F', textAlign: 'center', marginVertical: 15, height:30 }}>{i18n.t('Return')}</Text>
    </Pressable>
  )
}