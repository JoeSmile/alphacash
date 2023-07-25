import { View, Text, StyleSheet, Image,FlatList,TouchableOpacity,Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useSystemStore } from '@store/useSystemStore'


export default function CollectionAccount () {
  const store = useSystemStore()

  return(
    <View style={styles.container}>
      <Image source={require('@assets/applyLoan/loan_ic_collection_account.png')} style={{width: 35, height: 35}}></Image>
      <View style={styles.contentStyle}>
        <Text style={{ fontSize: 15,color: '#4F5E6F',fontWeight: 500}}>Collection Account</Text>
        <Text style={[styles.accountStyle,(store.cardInfo.bankAccount || store.cardInfo.ewalletAccount ) || {display: 'none'}]}>{(store.cardInfo.bankAccount || store.cardInfo.ewalletAccount ) || ''}</Text>
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

  accountStyle: {
    color: '#0A233E', 
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8 
  }

});