import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useI18n } from "@hooks/useI18n";

export function Process() {
  const { i18n } = useI18n();

  return (
    <View
      style={{
        marginHorizontal: 24,
        bottom: 5,
      }}
    >
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            "white",
            "#00B295",
            "#00B295",
            "#00B295",
            "#00B295",
            "white",
          ]}
          style={{ width: "100%", height: 2, opacity: 0.4 }}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            transform: [{ translateY: -9 }],
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.number}>1</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.number}>2</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.number}>3</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            transform: [{ translateY: -5 }],
          }}
        >
          <Text style={styles.text}> {i18n.t("Register")} </Text>
          <Text style={styles.text}> {i18n.t("CompleteInfo")} </Text>
          <Text style={styles.text}> {i18n.t("DisburseAmount")} </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  number: {
    borderWidth: 1,
    width: 15,
    height: 15,
    fontSize: 12,
    textAlign: "center",
    borderRadius: 10,
    color: "#00B295",
    borderColor: "#99E0D4",
    backgroundColor: "white",
    fontWeight: "600",
  },
  text: {
    fontSize: 12,
    color: "#8899AC",
    textAlign: "center",
    flex: 1,
  },
});
