import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import FList from "@components/FList";
import * as Linking from "expo-linking";
import { A } from "@expo/html-elements";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "../../../utils/dataTrack";
import { getWritingDirectionStyle, getMarginRightOrLeft, getRTLView } from '@styles';

const Item = (item) => {
  const { i18n, locale } = useI18n();

  return (
    <Pressable>
      <View style={[styles.item, getRTLView(locale)]}>
        <Image
          source={item.leftIcon}
          contentFit="cover"
          transition={1000}
          style={[{
            width: 24,
            height: 24,
          }, getMarginRightOrLeft(locale,12)]}
        />
        <Text style={styles.title}>{i18n.t(item.title)}</Text>
      </View>
    </Pressable>
  );
};

const data = [
  {
    title: "Online Service",
    leftIcon: require("@assets/images/mine_ic_online_service.png"),
    leftItem: (item) => {
      const { i18n, locale } = useI18n();

      return (
        <A
          href="https://google.com"
          style={{
            color: "#0825B8",
            textDecorationLine: "none",
            fontWeight: "bold",
          }}
        >
          <View
            style={[{
              flexDirection: "row",
              alignItems: "center",
            }, getRTLView(locale)]}
          >
            <Image
              source={item.leftIcon}
              contentFit="cover"
              transition={1000}
              style={{
                width: 24,
                height: 24,
                marginRight: 12,
              }}
            />
            <Text style={styles.title}>{i18n.t(item.title)}</Text>
            <Text
              style={[{
                ...styles.title,
                color: "#8899AC",
              }, getMarginRightOrLeft(locale, 0, 8)]}
            >
              {i18n.t("Recommend")}
            </Text>
          </View>
        </A>
      );
    },
  },
  {
    title: "Email",
    trackName: "pk16",
    leftIcon: require("@assets/images/mine_ic_email.png"),
    leftItem: Item,
  },
  {
    title: "Contact Number",
    tel: "xxxx",
    leftIcon: require("@assets/images/mine_ic_contact_number.png"),
    displayIcon: false,
    leftItem: (item) => {
      const { i18n, locale } = useI18n();

      return (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            <Image
              source={item.leftIcon}
              contentFit="cover"
              transition={1000}
              style={[{
                width: 24,
                height: 24,
              }, getMarginRightOrLeft(locale, 12)]}
            />
            <Text style={styles.title}>{i18n.t(item.title)}</Text>
          </View>
          <Pressable
            onPress={() => {
              doTrack("pk13", 1);
              //TODO: +区号
              Linking.openURL(`tel: ${item.tel}`);
            }}
          >
            <Text
              style={{
                ...styles.title,
                color: "#0825B8",
              }}
            >
              {i18n.t("Call")}
            </Text>
          </Pressable>
        </>
      );
    },
  },
];

export default function ContactUs() {
  const { i18n, locale } = useI18n();
  return (
    <View
      style={[{
        backgroundColor: "white",
        height: "100%",
      }, getWritingDirectionStyle(locale)]}
    >
      <View style={styles.container}>
        <FList data={data} itemStyle={styles.FList} />

        <View style={[getRTLView(locale)]}>
          <Text style={{
            color: "#8899AC",
            fontSize: 12,
            lineHeight: 18,
          }}>
              {`${i18n.t('Key Executive For Loan Handling officer Name')}: `}
          </Text>
          <Text style={{
            color: "#8899AC",
            fontSize: 12,
            lineHeight: 18,
          }}>
              xxxxxxx 
          </Text>
        </View>

        <View style={[getRTLView(locale)]}>
          <Text style={{
            color: "#8899AC",
            fontSize: 12,
            lineHeight: 18,
          }}>
              {`${i18n.t('Contact Email')}: `}
          </Text>
          <Text style={{
            color: "#8899AC",
            fontSize: 12,
            lineHeight: 18,
          }}>
            XXXXXX@com
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    height: 62,
    borderWidth: 1,
    borderColor: "#C0C4D6",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  title: {
    color: "#0A233E",
    fontSize: 16,
    fontWeight: "600",
  },
});
