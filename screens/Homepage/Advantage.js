import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Asset } from "expo-asset";

export function Advantage () {
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
          fontSize: '16px',
          fontWeight: 'bold',
          paddingLeft: 10
        }}>Advantage</Text>
      </View>
      <View style={{
        height: 56,
        flexDirection: 'row',
        gap: 15
      }}>
        <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_advantage_bg1.png")).uri,
        }} style={{flex: 1, padding: 10}}>
          <Text style={{color: '#4F5E6F', fontSize: 14, marginBottom: 5}}>High</Text>
          <Text style={{color: '#4F5E6F', fontSize: 14}}>Amount</Text>
        </ImageBackground>
        <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_advantage_bg2.png")).uri,
        }} style={{flex: 1, padding: 10}}>
            <Text style={{color: '#4F5E6F', fontSize: 14, marginBottom: 5}}>Fast</Text>
            <Text style={{color: '#4F5E6F', fontSize: 14}}>Disburse</Text>
          </ImageBackground>
         <ImageBackground source={{
          uri: Asset.fromModule(require("@assets/bills/home_advantage_bg3.png")).uri,
        }} style={{flex: 1, padding: 10}}>
          <Text style={{color: '#4F5E6F', fontSize: 14, marginBottom: 5}}>Flexible</Text>
          <Text style={{color: '#4F5E6F', fontSize: 14}}>Repayment</Text>
        </ImageBackground>
      </View>
    </View>
  )
}
