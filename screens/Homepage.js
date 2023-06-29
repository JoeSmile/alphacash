import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";

export default function Homepage() {
  const { i18n, setLocale, locale }= useI18n();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <Pressable onPress={() => setLocale(locale === LocaleTypes.en ? LocaleTypes.urdu : LocaleTypes.en)}>
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
