import { ScrollView, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { CompanyIntro } from "./CompanyIntro";
import { Quota } from "./Quota";
import { Advantage } from "./Advantage";
import { AntiFraudTips } from "./AntiFraudTips";
import { OnlineService } from "./OnlineService";
import HomeModals from "./HomeModals";
import { useEffect } from "react";
import { AppEventsLogger } from "react-native-fbsdk-next";

export default function Homepage({ navigation, route }) {
  const { i18n, setLocale, locale } = useI18n();
  const { showModal } = route?.params || {};
  // useEffect(() => {
  //   AppEventsLogger?.logEvent('pk14');
  // }, [])
  if (!!AppEventsLogger) {
    // console.log('AppEventsLogger', AppEventsLogger.logPurchase(111, 'USD'));
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner} />
      <CompanyIntro />
      <Quota />
      <Advantage />
      <AntiFraudTips />
      <OnlineService />
      <HomeModals showModal={showModal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  banner: {
    top: 0,
    position: "absolute",
    backgroundColor: "#0825B8",
    width: "100%",
    height: 150,
    zIndex: 0,
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
