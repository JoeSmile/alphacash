import { View, Text, ScrollView, StyleSheet,Image } from "react-native";
import ApplyLoanCard from "@components/ApplyLoanCard"
import LoanDetails from "@components/LoanDetails"
import { useGetCashLoanProductConfig } from '@apis'
import { useEffect,useState } from "react";

export default function Apply () {
  const { mutate: getCashLoanProductConfig, data: loanProductConfigData, 
    isLoading: isGetCashLoanProductConfigLoading} = useGetCashLoanProductConfig()

    const [optWithDaysConfig, setOptWithDaysConfig] = useState([]);
    const [isSpecialAccount, setIsSpecialAccount] = useState(true);
    
    const [daysOption,setDaysOption] = useState(0)
    const [amountIndex,setAmountIndex] = useState(0)

    useEffect(() => {
      getCashLoanProductConfig()
    },[])

    useEffect(() => {
      if(loanProductConfigData && loanProductConfigData.data.error_code == 1){
        const loanConfigInfo = loanProductConfigData.data.data.cashLoan
        //产品配置信息
        setOptWithDaysConfig(loanConfigInfo.optWithDaysConfig)
        //是否审核账号
        setIsSpecialAccount(loanConfigInfo.isSpecialAccount)
        //默认金额下标
        setAmountIndex(loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex)
        console.log('Sun>>> ' + loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex)
        console.log('Sun>>> ' + loanConfigInfo.optWithDaysConfig[0].opt)
      }
    },[loanProductConfigData])


  return (
     <ScrollView style={styles.container}>
     <View
        style={{
          top: 0,
          position: "absolute",
          backgroundColor: "#0825B8",
          width: "100%",
          height: 150,
          zIndex: 0,
        }}
      />
       <View style={{padding: 12}}>
        {!!optWithDaysConfig[daysOption] && <ApplyLoanCard 
        optWithDaysConfig = {optWithDaysConfig} 
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></ApplyLoanCard>}
        {/* <LoanDetails loanConfigInfo={loanConfigInfo.optWithDaysConfig}></LoanDetails> */}

       </View>

       </ScrollView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F5F7",
  },
  
});