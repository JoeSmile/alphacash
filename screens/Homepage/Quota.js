import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";
import { Process } from './Process';
import { FButton } from '@components/FButton';
import { useGetUserQuota } from '@apis';
import { useEffect } from "react";
import { LOAN_STATUS, statusToImg } from "@const";

export function Quota() {
  const { i18n, setLocale, locale } = useI18n();
  const navigation = useNavigation();
  const { mutate: getUserQuota, data } = useGetUserQuota();
//   "cashLoan": {
//     //默认金额
//     "quota": 60000,
//     //是否有资格申请
//     "isEligible": true,
//     //用户类型 1 新客户 2 老客户
//     "userType": 1,
//     //审核驳回 - 是否需要重传照片 
//     "isModifyInfo": true、false,
//     //审核驳回 - 是否需要重传人脸识别照
//     "isModifyFaceImage": true、false,
//     //是否展示还款提醒
//     "isOpenRepayment":true,fasle
//     "bill": {
//         //贷款id
//         "loanId":1,
//         //到期时间
//         "dueDate":"13/03/2023",
//         //申请金额
//         "applyAmount":3000,
//         //贷款周期
//         "loanCycle":7/14/30,
//         //申请时间
//         "applyTime":"12/02/2023",
//         //订单状态
//         "loanStatus":101,
//     }
// }
  useEffect(()=> {
    getUserQuota();
  }, []);

  useEffect(()=> {
    console.log('data', data);
  }, [data]);

  return (
    <View style={styles.container}> 
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require("@assets/bills/loan_tag_overdue.png")} 
          style={{
            position: 'absolute',
            width: 102,
            height: 73,
            top: 0,
            right: 0
          }}/>
        <Text style={{
          fontSize: 16,

          color: '#0A233E',
          marginTop: 30,
          marginBottom: 15
        }}>Max Amount</Text>
        <Text style={{
          fontSize: 40,
          marginBottom: 15,
          fontWeight: 600
        }}>Rs. 60,000</Text>
      </View>
      <FButton style={{
          marginBottom: 45,
          marginRight: 15,
          marginLeft: 15
        }}
        onPress={() => navigation.push('Apply')}
        title='Get Loan'
        />
      <Process />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   margin: 15,
   paddingBottom: 15,
   borderRadius: 4,
   boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.1),1px 1px 2px 1px rgba(0, 0, 0, 0.06)'
  },
});
