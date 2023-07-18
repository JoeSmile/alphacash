import { View, Text, StyleSheet, Image,FlatList,TouchableOpacity,Pressable } from "react-native";
import { useEffect, useState } from "react";

export default function CollectionAccount () {

  return(
    <View style={styles.container}>
      <Image source={require('@assets/applyLoan/loan_ic_collection_account.png')} style={{width: 35, height: 35}}></Image>
      <View style={styles.contentStyle}>
        <Text style={{ fontSize: 15,color: '#4F5E6F',fontWeight: 500,}}>Collection Account</Text>
        <Text style={{color: '#0A233E', fontWeight: 'bold',marginTop: 8,fontSize: 15}}>0123 321 321 10</Text>
      </View>
      <Image source={require('@assets/applyLoan/com_ic_right.png')} style={{width: 15, height: 15}}></Image>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
  },

  contentStyle: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },

});