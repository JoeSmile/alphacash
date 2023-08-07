import { StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n } from "@hooks/useI18n";
import { useUserQuota } from "@store";

export function CompanyIntro() {
  const { i18n } = useI18n();
  const [bill] = useUserQuota((s) => [s.bill]);

  return (
    <View style={styles.container}>
      {bill.appStatus == 101 ||
      bill.appStatus == 201 ||
      bill.appStatus == 202 ||
      bill.appStatus == 301 ||
      bill.appStatus == 302 ? (
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "column",
          }}
        >
          <Image
            source={require("@assets/images/home_top_logo2.png")}
            style={{
              width: 205,
              height: 42,
            }}
          />
        </View>
      ) : (
        <Image
          source={require("@assets/images/home_top_logo.png")}
          style={{
            width: 210,
            height: 65,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    width: "100%",
    backgroundColor: "transparent",
    color: "white",
    paddingHorizontal: 15,
    marginTop: 46,
  },
});
