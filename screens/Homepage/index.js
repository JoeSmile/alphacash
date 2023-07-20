import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { CompanyIntro } from "./CompanyIntro";
import { Quota } from "./Quota";
import { Advantage } from './Advantage';
import { AntiFraudTips } from './AntiFraudTips';
import { OnlineService } from './OnlineService';

export default function Homepage({navigation}) {
  const { i18n, setLocale, locale } = useI18n();

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          top: 0,
          position: "absolute",
          backgroundColor: "#0825B8",
          width: "100%",
          height: 150,
          zIndex: 0,
        }}
      />
      <CompanyIntro />
      <Quota />
      <Advantage />
      <AntiFraudTips />
      <OnlineService />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingBottom: 20
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
  },
});
