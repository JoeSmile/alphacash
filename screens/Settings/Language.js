import { Text, Pressable, View, FlatList } from "react-native";
import { useI18nStore } from "@store/useI18nStore";
import { Ionicons } from "@expo/vector-icons";

const data = [
  {
    title: "English",
    locale: "en",
  },
  {
    title: "Urdu",
    locale: "urdu",
  },
];

const Item = ({ locale, title }) => {
  const [currentLocale, setLocale] = useI18nStore((s) => [
    s.locale,
    s.setLocale,
  ]);

  return (
    <Pressable
      onPress={() => {
        setLocale(locale);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{title}</Text>
        {currentLocale == locale && (
          <Ionicons name="checkmark" size={12} color="black" />
        )}
      </View>
    </Pressable>
  );
};
export const Language = () => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item title={item.title} locale={item.locale} />
        )}
        keyExtractor={(item) => item.locale}
      />
    </View>
  );
};
