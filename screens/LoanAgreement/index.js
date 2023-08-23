import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
} from "react-native";
import {WebView} from "react-native-webview";

export default function LoanAgreement() {

return(
  <SafeAreaView style={styles.container}>
    {
    <WebView 
    style={{flex: 1,padding: 12}}
    source={{uri: 'https://github.com/facebook/react-native'}}
    >
    </WebView>
    }
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F4F5F7",
    flex: 1,
  },
});