import { useNavigation } from "@react-navigation/native";
import { Text, Pressable } from "react-native";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";

export default function Return({ trackName }) {
  const navigation = useNavigation();
  const { i18n } = useI18n();

  return (
    <Pressable
      onPress={() => {
        doTrack(trackName, 1);
        navigation.goBack();
      }}
    >
      <Text
        style={{
          color: "#4F5E6F",
          textAlign: "center",
          marginVertical: 15,
          height: 30,
        }}
      >
        {i18n.t("Return")}
      </Text>
    </Pressable>
  );
}
