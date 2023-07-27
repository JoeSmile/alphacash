import {
  ImageBackground,
  StyleSheet,
  View,
  Text
} from "react-native";
import { Asset } from "expo-asset";
import { useI18n } from "@hooks/useI18n";

export function AntiFraudTips () {
  const { i18n } = useI18n();

  return (
    <View style={{
      padding: 15,
      position: 'relative'
    }}>

      <View style={{
        borderRadius: 4,
        backgroundColor: '#F8F8F8'
      }}>
        <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_anti_fraud_tips.png")).uri,
        }} style={{
          height: 106,
          width: 108,
          alignSelf: 'flex-end',
          position: 'absolute'
        }} />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            paddingTop: 15,
          }}>
            <View style={{
              height: 12,
              width:3,
              backgroundColor: '#0825B8',
            }}/>
            <Text style={{
              color: '#0A233E',
              fontSize: 16,
              fontWeight: 'bold',
              paddingLeft: 10,
            }}>Anti-Fraud Tips: </Text>
          </View>
          <View style={{
            paddingHorizontal: 15,
            paddingBottom: 15
          }}>
            <Text style={{
              color: '#4F5E6F',
              fontSize: 12
            }}>
            {i18n.t('AntiFraudTips')}
          </Text>
        </View>
      </View>
    </View>
  )
}