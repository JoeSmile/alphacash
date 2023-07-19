import { View, Text, ScrollView, StyleSheet,Image,TouchableOpacity,Pressable,SafeAreaView,Linking } from "react-native";
import ApplyLoanCard from "@components/ApplyLoanCard";
import LoanDetails from "@components/LoanDetails";
import { useGetCashLoanProductConfig,useGetApplyLoanVoice } from '@apis';
import { useEffect,useState } from "react";
import CollectionAccount from "@components/CollectionAccount";
import FaceRecognition from "@components/FaceRecognition";
import Checkbox from 'expo-checkbox';

const initVoiceData = {
  "language": "en",
  "applyAmount": "6000",
  "dayNum": "7",
  "disburseMoney": "6000",
  "dailyRate": "0",
  "fineStrategyText": ""
}


export default function Apply () {
  const { mutate: getCashLoanProductConfig, data: loanProductConfigData, 
    isLoading: isGetCashLoanProductConfigLoading} = useGetCashLoanProductConfig()

    const { mutate: getApplyLoanVoice, data: applyLoanVoiceData, 
      isLoading: isGetApplyLoanVoiceLoading} = useGetApplyLoanVoice()

    const [optWithDaysConfig, setOptWithDaysConfig] = useState([]);
    const [isSpecialAccount, setIsSpecialAccount] = useState(true);
    
    const [daysOption,setDaysOption] = useState(0)
    const [amountIndex,setAmountIndex] = useState(0)
    const [isChecked, setChecked] = useState(false);
    const [faceData, setFaceData] = useState(false)
    const [toVoice,setToVoice] = useState(false)
    const [voiceData,setVoiceData] = useState()

    useEffect(() => {
      getCashLoanProductConfig()
      setVoiceData(initVoiceData)
    },[])

    const clickLoanAgreement = (() => {
      console.log('Sun >>> clickLoanAgreement')
      const url = 'https://www.baidu.com'
      Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URL: " + url);
        }
      })
      .catch((error) => console.error('An error occurred: ', error));

    }) 

    const getLoan = (() => {
      if(isChecked){
        console.log('Sun >>> getLoan')
        setToVoice(true)
        getApplyLoanVoice(voiceData)
      } else {
        return
      }
    })

    const clickCollectionAccount = (() => {
      console.log('Sun >>> clickCollectionAccount')
    })

    const clickFaceRecognition = (() => {
      console.log('Sun >>> clickFaceRecognition')
    })

    useEffect(() => {
      if(loanProductConfigData && loanProductConfigData.data.error_code == 1){
        const loanConfigInfo = loanProductConfigData.data.data.cashLoan
        //产品配置信息
        setOptWithDaysConfig(loanConfigInfo.optWithDaysConfig)
        //是否审核账号
        setIsSpecialAccount(loanConfigInfo.isSpecialAccount)
        //默认金额下标
        setAmountIndex(loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex)
        //默认天数下标
        // setDaysOption(loanConfigInfo.defaultDayOption)
        // console.log('Sun>>> ' + loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex)
        // console.log('Sun>>> ' + loanConfigInfo.optWithDaysConfig[0].opt)
        // console.log('Sun>>> ' + loanConfigInfo.defaultDayOption)

      }
    },[loanProductConfigData])


  return (
    <SafeAreaView >
      <View style={[styles.container,toVoice === true && styles.otherContainer]}>
       <ScrollView>
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
      
       { !!optWithDaysConfig[daysOption] && !isGetCashLoanProductConfigLoading && 
       <View style={{padding: 12}}>

       
        <ApplyLoanCard 
        optWithDaysConfig = {optWithDaysConfig} 
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></ApplyLoanCard>

        <LoanDetails 
        optWithDaysConfig = {optWithDaysConfig}
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></LoanDetails>

        <Pressable onPress={() => clickCollectionAccount()}>
          <CollectionAccount></CollectionAccount>
        </Pressable>

        <Pressable onPress={() => clickFaceRecognition()}>
        <FaceRecognition></FaceRecognition>
        </Pressable>
        

        <View style={styles.loanAgreementStyle}>
          <Checkbox 
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#0825B8' : undefined}
          ></Checkbox>
          <Text style={{marginHorizontal: 6,fontSize: 12, color: '#4F5E6F'}}>Agree</Text>
          <Pressable onPress={() => clickLoanAgreement()}>
          <Text style={{fontSize: 12, color: '#0825B8', fontWeight: 'bold'}}>Loan Agreement</Text>
          </Pressable>
        </View>

        
        <Text style={{fontSize: 12,color: '#4F5E6F'}}>
          {'Kind Tips：'}
          {'\n'}
          {'1.Cooling off period: If you regret applying for a loan,please contact us promptly and repay the principal within24 hours.According to company regulations, we willcancel your loan application for free!'}
          {'\n\n'}
          {'2.Remember to repay the loan in time, if you fail to repay the loan on time, you will be fined according to the  Late Payment Charges rate of 2%/day!'}
          {'\n\n'}
          {'3.Key Excutive For Loan Handing Officer Name:Mr.Mohsin Ali'}
          {'\n'}
          {'Contact Email:xxxxt@xx.com'}
          {'\n'}
          {'address:XXXXXXXX'}
        </Text>

       </View>
       }
       </ScrollView>

       <TouchableOpacity onPress={() => getLoan()}>
       <View
        style={{
          bottom: 36,
          left: 36,
          right: 36,
          position: 'absolute',
          backgroundColor: isChecked ? "#0825B8" : "#C0C4D6",
          height: 46,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 3,
        }}>
          <Text style={{color: '#FFFFFF',fontSize: 15}}>Get Loan</Text>
          <Image source={require('@assets/applyLoan/btn_ic_right.png')} style={{width: 15, height: 15,marginLeft: 2}}></Image>

        </View>
        </TouchableOpacity>
      </View>

      {/* 语音 */}
      <View>

      </View>

    </SafeAreaView>
       
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F5F7",
  },

  otherContainer: {
    display: 'none'
  },

  loanAgreementStyle: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },

  
});