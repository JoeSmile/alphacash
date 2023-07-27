import { Pressable, StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export function CompanyIntro() {
  const { i18n } = useI18n();

  return (
    <View style={styles.container}> 
      <View style={{
         backgroundColor:'transparent',
         flexDirection: 'row',
         alignItems: 'center'
      }}>
        <Image 
          source={require('@assets/images/home_top_logo.png')} 
          style={{
            width: 210,
            height: 65
          }}
          />
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
    paddingHorizontal: 15
  },

});
