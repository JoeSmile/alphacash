import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { i18n } from "../hooks/useI18nStore";

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <Pressable onPress={() => setLocale(LocaleTypes.urdu)}>
        <Text>switch language</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
