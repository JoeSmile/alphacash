import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useI18n } from "@hooks/useI18n";

import { getWritingDirectionStyle, getMarginRightOrLeft } from '@styles';

export default function SafeIntro({ safeText }) {
  const { i18n, locale } = useI18n();

  return (
    <View style={styles.safeTextContainer}>
      <View>
        <Image
          source={require("@assets/images/mine_info_ic_safe.png")}
          contentFit="cover"
          transition={1000}
          style={[{
            width: 22,
            height: 22,
          }, getMarginRightOrLeft(locale, 5)]}
        />
      </View>
      <Text style={styles.safeText}>{safeText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeTextContainer: {
    borderRadius: 4,
    backgroundColor: "#F6F9FD",
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
  safeText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#4F5E6F",
  },
});
