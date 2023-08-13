import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { formatNumberToFinancial as fn2f } from "@utils";
import { useEffect, useState } from "react";
import React from "react";
import { useUserQuota } from "@store";

export default function BillCard ({navigation}) {
  const s = useUserQuota((s) => s);
  console.log('----bill----', s);
  return (
    <>
     <View style={styles.bill}>
      <Text style={{
        color: '#4F5E6F',
        fontSize: 16,
        textAlign:'center',
        marginVertical: 16
      }}>还款金额</Text>
      <Text style={{
        color: '#0A233E',
        fontSize: 32,
        textAlign:'center',
        marginBottom: 10
      }}>{fn2f(s.bill.applyAmount)}</Text>
      <View style={{borderWidth: 1, borderColor: '#F4F5F7', width: '100%'}} />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
        <Text style={{
          color: '#4F5E6F',
          fontSize: 14
        }}>到期日:</Text>
        <Text style={{
          color: '#0A233E',
          fontSize: 14
        }}>{s.bill.dueDate}</Text>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  bill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical:16,
    borderRadius: 4
  },
});