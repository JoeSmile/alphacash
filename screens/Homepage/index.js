import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, Toast, Provider } from '@ant-design/react-native';
import { CompanyIntro } from './CompanyIntro';
import { Quota } from './Quota';

export default function Homepage() {
  const { i18n, setLocale, locale } = useI18n();

  return (
    <View style={styles.container}> 
      <View style={{
        top: 0,
        position: "absolute",
        backgroundColor: "#0825B8",
        width: '100%',
        height: hp(20),
        zIndex: 0,
      }}/>
      <CompanyIntro />
      <Quota />
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <Pressable onPress={() => setLocale(locale === LocaleTypes.en ? LocaleTypes.urdu : LocaleTypes.en)}>
        <Text style={styles.test}>switch language</Text>
      </Pressable>
        <Button onPress={() => Toast.info('This is a toast tips')} color='black'>
          Start111  
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  test: {
    // fontSize: wp(8),
    fontSize: RFValue(24),
    width: wp(100),
    height: hp(20),
    marginVertical: hp(1),
    textAlign: "center",
  }
});
