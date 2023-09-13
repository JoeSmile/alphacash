import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { formatNumberToFinancial as fn2f } from "@utils";
import FList from "@components/FList";
import { useUserQuota } from "@store";
import BillCard from '../BillCard';
import { CHANNEL } from '../Repay';
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle, getMarginRightOrLeft, getRTLView } from '@styles';

// bill: {
//   //贷款id
//   loanId: 1,
//   //到期时间
//   dueDate: "13/03/2023",
//   //申请金额
//   applyAmount: 3000,
//   //贷款周期
//   loanTerm: 30,
//   //申请时间
//   applyDate: "12/02/2023",
//   //订单状态
//   appStatus: 101,
// },
const Item = (item) => {
  const { i18n, locale } = useI18n();

  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={[{
          width: 32,
          height: 32,
        }, getMarginRightOrLeft(locale, 12)]}
      />
      <Text style={getMarginRightOrLeft(locale, 12)}>{item.title}</Text>
    </View>
  );
};

const data = [
  {
    title: "Repayment via Easypaisa",
    screen: "Repay",
    leftIcon: require("@assets/repay/repayment_ic_easypaisa.png"),
    leftItem: Item,
    withRecommend: true,
    parameters: {channel: CHANNEL.easypaisa}
  },
  {
    title: "Repayment via PayPro",
    screen: "Repay",
    leftIcon: require("@assets/repay/repayment_ic_paypro.png"),
    leftItem: Item,
    parameters: {channel: CHANNEL.paypro}
  },
  {
    title: "Repayment via JazzCash",
    screen: "Repay",
    leftIcon: require("@assets/repay/repayment_ic_jazzcash.png"),
    leftItem: Item,
    parameters: {channel: CHANNEL.jazzcash}

  },
  {
    title: "Repayment via hbl Wallet" ,
    screen: "Repay",
    leftIcon: require("@assets/repay/repayment_ic_easypaisa.png"),
    leftItem: Item,
    parameters: {channel: CHANNEL.hbl}
  },
];

export default function RepayList({navigation, route}) {
  const { i18n, locale } = useI18n();

  return (
    <View style={[styles.container, getWritingDirectionStyle(locale)]}>
      {/* Bill info */}
      <BillCard />
      {/* Repay List */}
      <View style={{marginTop: 15}}>
      <View style={[{ alignItems: 'center'}, getRTLView(locale)]}>
        <View style={{
          borderColor: '#0825B8',
          borderLeftWidth: 2,
          height: 12
        }}/>
        <Text style={getMarginRightOrLeft(locale, 0, 5)}>{i18n.t('Repayment method')}</Text>
      </View>
       
        <View style={{position: 'relative', marginTop: 15}}>
          <Image
            source={require("@assets/repay/mine_ic_recommend.png")}
            contentFit="cover"
            transition={1000}
            style={{
              width: 100,
              height: 32,
              position: 'absolute',
              zIndex: 10,
              right: 100,
              top: -5
            }}
          />
          <FList data={data} itemStyle={styles.FList} />
        </View>
      </View>

      {/* 温馨提示：按时还款，信用额度会越来越高！ */}
      <View style={{marginTop: 10}}>
        <Text style={{color: '#8899AC', fontSize: 12}}>{i18n.t('Kind Tips')}:</Text>
        <Text style={{color: '#8899AC', fontSize: 12}}>{i18n.t('Repay on time, the credit limit will be higher and higher!')}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    padding: 15
  },
  bill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical:16,
    borderRadius: 4
  },
  FList: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    paddingVertical: 8
  },
});
