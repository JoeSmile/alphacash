import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export function CompanyIntro() {
  const { i18n, setLocale, locale } = useI18n();

  return (
    <View style={styles.container}> 
      <Text>AlphaCash</Text>
      <Text>Fast arrival, loan and repayment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    height: hp(10),
    width: '100%'
  },

});
