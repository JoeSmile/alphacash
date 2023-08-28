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
  <WebView 
    style={{flex: 1,padding: 12}}
    source={{uri: 'https://www.google.com'}}
    >
    </WebView>
    
);
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F4F5F7",
    flex: 1,
  },
});