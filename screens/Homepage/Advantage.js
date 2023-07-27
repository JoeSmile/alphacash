import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Asset } from "expo-asset";
import { useI18n, LocaleTypes } from "@hooks/useI18n";

export function Advantage () {
  const { i18n } = useI18n();

  return (
    <View style={{
      padding: 15,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
          paddingLeft: 10
        }}>{i18n.t('Advantage')}</Text>
      </View>
      <View style={{
        height: 56,
        flexDirection: 'row',
        gap: 15
      }}>
        <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_advantage_bg1.png")).uri,
        }} style={{flex: 1, padding: 10}}>
          <Text style={{color: '#4F5E6F', fontSize: 14, width: 55}}>{i18n.t('HighAmount')}</Text>
        </ImageBackground>
        <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_advantage_bg2.png")).uri,
        }} style={{flex: 1, padding: 10}}>
            <Text style={{color: '#4F5E6F', fontSize: 14, width: 60}}>{i18n.t('FastDisburse')}</Text>
          </ImageBackground>
         <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_advantage_bg3.png")).uri,
        }} style={{flex: 1, padding: 10}}>
          <Text style={{color: '#4F5E6F', fontSize: 14}}>{i18n.t('FlexibleRepayment')}</Text>
        </ImageBackground>
      </View>
    </View>
  )
}
