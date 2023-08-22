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
import { useI18n } from "@hooks/useI18n";

export default function BillCard ({navigation}) {
  const bill = useUserQuota((s) => s.bill);
  const { i18n, locale } = useI18n();

  return (
    <>
     <View style={styles.bill}>
      <Text style={{
        color: '#4F5E6F',
        fontSize: 16,
        textAlign:'center',
        marginVertical: 16
      }}>{i18n.t('Lump Sum Repayment Amount')}</Text>
      <Text style={{
        color: '#0A233E',
        fontSize: 32,
        textAlign:'center',
        marginBottom: 10
      }}>{fn2f(bill.applyAmount)}</Text>
      <View style={{borderWidth: 1, borderColor: '#F4F5F7', width: '100%'}} />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
        <Text style={{
          color: '#4F5E6F',
          fontSize: 14
        }}>{i18n.t('Due Date')}:</Text>
        <Text style={{
          color: '#0A233E',
          fontSize: 14
        }}>{bill.dueDate}</Text>
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