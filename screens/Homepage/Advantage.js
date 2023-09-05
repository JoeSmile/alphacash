import { View, Text, ImageBackground } from "react-native";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle, getPaddingRightOrLeft } from '@styles';
import { useSystemStore } from "@store/useSystemStore";

export function Advantage() {
  const { i18n,locale } = useI18n();
  const [isLogin, phone] = useSystemStore((s) => [!!s.token, s.phone]);

  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
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
          style={[{
            color: "#0A233E",
            fontSize: 16,
            lineHeight: 22,
            fontWeight: "600",
          }, getPaddingRightOrLeft(locale, 0, 6)]}
        >
          {i18n.t("Advantage")}
        </Text>
      </View>
      <View
        style={{
          height: 56,
          flexDirection: "row",
          gap: 15,
        }}
      >
        <ImageBackground
          source={require("@assets/bills/home_advantage_bg1.png")}
          style={{ flex: 1, padding: 10 }}
        >
          <Text style={{ color: "#4F5E6F", fontSize: 14 }}>
            {i18n.t("HighAmount")}
          </Text>
        </ImageBackground>
        <ImageBackground
          source={require("@assets/bills/home_advantage_bg2.png")}
          style={{ flex: 1, padding: 10 }}
        >
          <Text style={{ color: "#4F5E6F", fontSize: 14 }}>
            {isLogin ? i18n.t('OpportunityForExemption') : i18n.t("FastDisburse")}
          </Text>
        </ImageBackground>
        <ImageBackground
          source={require("@assets/bills/home_advantage_bg3.png")}
          style={{ flex: 1, padding: 10 }}
        >
          <Text style={{ color: "#4F5E6F", fontSize: 14 }}>
            {isLogin ? i18n.t("UnlockMoreLoanTerm" ): i18n.t("FlexibleRepayment")}
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
}
