import { View, Text, StyleSheet, Image,FlatList,TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";


export default function LoanDetails ({ loanConfigInfo }) {

  return (
    <View style={styles.container}>
   
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    height: 290,
    backgroundColor: 'white',
    zIndex: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 12,
  },

  listItemStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 46,
    fontSize: 15,
    color:'#4F5E6F',
  }

});