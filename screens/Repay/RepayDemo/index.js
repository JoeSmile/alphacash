import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import EasypaisaDemo from "./EasypaisaDemo";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle } from "@styles";

export default function RepayDemo({ navigation, route }) {
  const [type, setType] = useState("");
  const { i18n, locale } = useI18n();

  useEffect(() => {
    const type = route.params ? route.params.type : "";
    setType(type);
    navigation.setOptions({
      headerTitle: i18n.t("EasyPaisa Repayment Operation Instructions", {
        type: type,
      }),
    });
  }, [navigation, route]);

  return (
    <View style={[styles.container, getWritingDirectionStyle(locale)]}>
      <View>
        <Text style={styles.title}>{i18n.t("Operating steps")}:</Text>
        <Text style={{ color: "#4F5E6F", fontSize: 14 }}>
          {i18n.t("Log in EasyPaisa Account and then enter Consumer ID", {
            type: type,
          })}
        </Text>
      </View>

      <View style={{ marginTop: 20, flex: 1 }}>
        <Text style={styles.title}>
          {i18n.t("As shown in the example below")}
        </Text>
        {type.toLowerCase() == "easypaisa" && <EasypaisaDemo type={type} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    padding: 15,
  },
  title: {
    color: "#0A233E",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
  },
});
