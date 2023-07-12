import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '@ant-design/react-native';
export function Quota() {
  const { i18n, setLocale, locale } = useI18n();

  return (
    <View style={styles.container}> 
      <Text>Max Amount</Text>
      <Text>Rs. 60,000</Text>
      <Button style={{borderWidth: 0, 
        backgroundColor: '#0825B8'}}>
          <Text style={{color: 'white'}}>Get Loan</Text>
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   padding: 15,
   margin: 15,
   width: '100%'
  },
});
