import { View, Text, Pressable, StyleSheet } from "react-native";
import { useI18n, LocaleTypes } from "@hooks/useI18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        justifyContent: "flex-end",
        transform: [{ translateY: 20 }],
      }}
    >
      <Pressable onPress={() => setLocale(LocaleTypes.en)}>
        <Text
          style={{
            color:
              locale == LocaleTypes.en ? "white" : "rgba(255, 255, 255, 0.5)",
            fontSize: 14,
          }}
        >
          EN
        </Text>
      </Pressable>
      <Text
        style={{
          color: "white",
        }}
      >
        |
      </Text>
      <Pressable onPress={() => setLocale(LocaleTypes.urdu)}>
        <Text
          style={{
            color:
              locale == LocaleTypes.urdu ? "white" : "rgba(255, 255, 255, 0.5)",
            fontSize: 14,
          }}
        >
          اردو
        </Text>
      </Pressable>
    </View>
  );
}
