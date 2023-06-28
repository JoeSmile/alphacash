import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useI18nStore, LocaleTypes } from "../hooks/useI18nStore";


export default function Homepage() {
  const { i18n, setLocale } = useI18nStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <Pressable onPress={() => setLocale(LocaleTypes.zh)}>
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
