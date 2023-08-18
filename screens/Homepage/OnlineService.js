import { View, Text, Image } from "react-native";
import { useI18n } from "@hooks/useI18n";

export function OnlineService() {
  const { i18n } = useI18n();

  return (
    <View
      style={{
        marginBottom: 40,
        height: 40,
        borderRadius: 4,
        marginHorizontal: 15,
        padding: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1.5,
        },
        shadowOpacity: 0.16,
        shadowRadius: 3,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          source={require("@assets/bills/home_ic_online_service.png")}
          contentFit="cover"
          transition={1000}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text
          style={{
            marginLeft: 8,
          }}
        >
          {i18n.t("Online Service")}
        </Text>
      </View>
      <Image
        source={require("@assets/images/home_ic_right.png")}
        contentFit="cover"
        transition={1000}
        style={{
          width: 8,
          height: 12,
        }}
      />
    </View>
  );
}
