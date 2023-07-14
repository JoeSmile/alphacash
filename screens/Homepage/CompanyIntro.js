import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export function CompanyIntro() {
  const { i18n, setLocale, locale } = useI18n();

  return (
    <View style={styles.container}> 
      <Text style={{
        fontSize: 18,
        color: 'white',
        fontWeight: 600,
        marginBottom: 10
      }}>AlphaCash</Text>
      <Text style={{
        fontSize: 14,
        opacity: 0.8,
        color: 'white'
      }}>Fast arrival, loan and repayment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    width: '100%',
    backgroundColor:'transparent',
    color: 'white',
    paddingHorizontal: 15
  },

});
