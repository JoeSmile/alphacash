import { ImageBackground, View, Text } from "react-native";
import { useI18n } from "@hooks/useI18n";

export function AntiFraudTips() {
  const { i18n } = useI18n();

  return (
    <View
      style={{
        padding: 15,
        position: "relative",
      }}
    >
      <View
        style={{
          borderRadius: 4,
          backgroundColor: "#F8F8F8",
        }}
      >
        <ImageBackground
          source={require("@assets/bills/home_anti_fraud_tips.png")}
          style={{
            height: 106,
            width: 108,
            alignSelf: "flex-end",
            position: "absolute",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 8,
          }}
        >
          <View
            style={{
              height: 12,
              width: 2,
              backgroundColor: "#0825B8",
            }}
          />
          <Text
            style={{
              color: "#4F5E6F",
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "bold",
              paddingLeft: 6,
            }}
          >
            {`${i18n.t("Anti-fraud Tips")}:`}
          </Text>
        </View>
        <View
          style={{
            padding: 8,
          }}
        >
          <Text
            style={{
              color: "#4F5E6F",
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            {i18n.t("AntiFraudTips")}
          </Text>
        </View>
      </View>
    </View>
  );
}
