import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '@ant-design/react-native';
import { useNavigation } from "@react-navigation/native";
import { Process } from './Process';
import { FButton } from '@components/FButton';

export function Quota() {
  const { i18n, setLocale, locale } = useI18n();
  const navigation = useNavigation();

  return (
    <View style={styles.container}> 
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require("@assets/bills/loan_tag_overdue.png")} 
          style={{
            position: 'absolute',
            width: 102,
            height: 73,
            top: 0,
            right: 0
          }}/>
        <Text style={{
          fontSize: 16,

          color: '#0A233E',
          marginTop: 30,
          marginBottom: 15
        }}>Max Amount</Text>
        <Text style={{
          fontSize: 40,
          marginBottom: 15,
          fontWeight: 600
        }}>Rs. 60,000</Text>
      </View>
      <FButton style={{
          borderWidth: 0, 
          backgroundColor: '#0825B8',
          marginBottom: 45,
          marginRight: 15,
          marginLeft: 15
        }}
        onPress={() => navigation.push('Apply')}
        title='Get Loan'
        />
      <Process />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   margin: 15,
   paddingBottom: 15,
   borderRadius: 4,
   boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.1),1px 1px 2px 1px rgba(0, 0, 0, 0.06)'
  },
});
