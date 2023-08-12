import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { formatNumberToFinancial as fn2f } from "@utils";
import FList from "@components/FList";

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
  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={{
          width: 32,
          height: 32,
        }}
      />
      <Text style={{marginLeft: 12}}>{item.title}</Text>
    </View>
  );
};

const data = [
  {
    title: "Repayment via Easypaisa",
    screen: "RepayDemo",
    leftIcon: require("@assets/repay/repayment_ic_easypaisa.png"),
    leftItem: Item,
    withRecommend: true
  },
  {
    title: "Repayment via PayPro",
    screen: "RepayDemo",
    leftIcon: require("@assets/repay/repayment_ic_paypro.png"),
    leftItem: Item,
  },
  {
    title: "Repayment via JazzCash",
    screen: "RepayDemo",
    leftIcon: require("@assets/repay/repayment_ic_jazzcash.png"),
    leftItem: Item,
  },
  {
    title: "Repayment via Bank Wallet" ,
    screen: "RepayDemo",
    leftIcon: require("@assets/repay/repayment_ic_easypaisa.png"),
    leftItem: Item,
  },
];

export default function RepayList({navigation, route}) {
  const [bill, setBill] = useState({
    dueDate: "12/02/2023",
    applyAmount: 3000,
  });
  useEffect(() => {
    const bill = route.params ? route.params.bill : '';
    console.log('bill---123', Object.keys(bill));
    if (bill && Object.keys(bill)) {
      setBill(bill);
    }
  }, [route]);

  console.log('bill---', bill);

  if (!bill) {
    return <></>
  }
  return (
    <View style={styles.container}>
    {/* Bill info */}
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
          }}>到期日:</Text>
          <Text style={{
            color: '#0A233E',
            fontSize: 14
          }}>{bill.dueDate}</Text>
        </View>
      </View>
      {/* Repay List */}
      <View style={{marginTop: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{
          borderColor: '#0825B8',
          borderLeftWidth: 2,
          height: 12
        }}/>
        <Text style={{
          marginLeft: 5
          }}>还款方式</Text>
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

      {/* 温馨提示：
按时还款，信用额度会越来越高！ */}
      <View style={{marginTop: 10}}>
        <Text style={{color: '#8899AC', fontSize: 12}}>温馨提示：</Text>
        <Text style={{color: '#8899AC', fontSize: 12}}>按时还款，信用额度会越来越高!</Text>
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
