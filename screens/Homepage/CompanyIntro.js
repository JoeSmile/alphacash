import { Pressable, StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useUserQuota } from "@store";

export function CompanyIntro() {
  const { i18n } = useI18n();
  const [bill] = useUserQuota((s) => [
    s.bill,
  ]);

  return (
    <View style={styles.container}> 
      <View style={{
         backgroundColor:'transparent',
         flexDirection: 'row',
         alignItems: 'center'
      }}>
        {
          (bill.appStatus == 101 || bill.appStatus == 201 || bill.appStatus == 202 || bill.appStatus == 301 ||  bill.appStatus == 302) ? 
          <Image 
          source={require('@assets/images/home_top_logo2.png')} 
          style={{
            width: 205,
            height: 42
          }}
          />
          :
          <Image 
          source={require('@assets/images/home_top_logo.png')} 
          style={{
            width: 210,
            height: 65
          }}
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    width: '100%',
    backgroundColor:'transparent',
    color: 'white',
    paddingHorizontal: 15,
    marginTop: 46
  },

});
