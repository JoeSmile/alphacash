import { Text, Pressable, View, FlatList, Image } from "react-native";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle } from '@styles';
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
  const {locale:currentLocale, setLocale} = useI18n();

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
          height: 60,
          borderWidth: 2,
          borderColor: currentLocale == locale ? '#0825B8' : '#C0C4D6',
          lineHeight: 60,
          alignItems: 'center',
          padding: 10,
          borderRadius: 4,
          marginTop: 10,
          backgroundColor: 'white'
        }}
      >
        <Text style={{
          color: '#0A233E',
          fontSize: 16
        }}>{title}</Text>
        <Image source={currentLocale == locale ? require("@assets/images/bank_card_radio_sel.png") :  require("@assets/images/unSelected.png")}
            contentFit="cover"
            transition={200}
            style={{ width: 20, height: 20}} 
          />
      </View>
    </Pressable>
  );
};
export const Language = () => {
  const { i18n, locale } = useI18n();

  return (
    <View style={[{
      padding: 20,
      backgroundColor: 'white',
      height: '100%'
    }, getWritingDirectionStyle(locale)]}>
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
