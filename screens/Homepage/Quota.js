import { Pressable, StyleSheet } from "react-native";
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
        <Text style={{
          fontSize: 16,
          color: '#0A233E',
          marginTop: 15,
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
          marginBottom: 30
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
   padding: 15,
   margin: 15,
   borderRadius: 4,
   boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.1),1px 1px 2px 1px rgba(0, 0, 0, 0.06)'
  },
});
