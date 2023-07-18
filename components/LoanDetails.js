import { View, Text, StyleSheet, Image,TouchableOpacity,Pressable } from "react-native";
import { useEffect, useState } from "react";


const imageDown = require('@assets/applyLoan/loan_ic_arrow_down.png')
const imageUp = require('@assets/applyLoan/loan_ic_arrow_up.png')

export default function LoanDetails ({ 
  optWithDaysConfig,
  setOptWithDaysConfig,
  daysOption,
  setDaysOption,
  amountIndex,
  setAmountIndex,
 }) {

  const [isChecked,setIsChecked] = useState(false)
  const [image,setImage] = useState(imageDown)
  //是否显示滞纳金
  const [isVisiable,setIsVisiable] = useState(false)


  const handleFeePress = () => {
    setIsChecked(!isChecked)
    if(isChecked){
      setImage(imageDown)
    } else {
      setImage(imageUp)
    }
  };

  const handleVisiable = () => {
    if(optWithDaysConfig[daysOption].days === 30){
      setIsVisiable(true)
    } else {
      setIsVisiable(false)
    }
  }

  useEffect(() => {
    handleVisiable()
  })

  return (
    <View style={styles.container}>

     <View style={styles.listItemStyle}>
      <View style={styles.feeItemStyle}>
      <Text>Fee</Text>
      <Text style={{color: '#0A233E',fontWeight: 800}}>RS. {optWithDaysConfig[daysOption].opt[amountIndex].manageFee}</Text>
      </View>
      <TouchableOpacity onPress={() => handleFeePress()}>
      <Image source={image} style={styles.imageStyle}></Image>
      </TouchableOpacity>
     </View>

     {/* 费用明细 */}
     { isChecked &&
      <View style={styles.feeUnflodStyle}>

     <View style={styles.feeUnflodItemStyle}>
      <Text style={styles.textStyle}>Credit Approval Fee </Text>
      <Text style={styles.textStyle}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].manageFeeDetail.LoanApprovalFee}</Text>
     </View>

     <View style={styles.feeUnflodItemStyle}>
      <Text style={styles.textStyle}>Service Fee</Text>
      <Text style={styles.textStyle}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].manageFeeDetail.serviceFee}</Text>
     </View>

     <View style={styles.feeUnflodItemStyle}>
      <Text style={styles.textStyle}>System fee</Text>
      <Text style={styles.textStyle}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].manageFeeDetail.manageFee}</Text>
     </View>

     <View style={styles.feeUnflodItemStyle}>
      <Text style={styles.textStyle}>Processing Fee Charges</Text>
      <Text style={styles.textStyle}>RS.0</Text>
     </View>

     <View style={styles.feeUnflodItemStyle}>
      <Text style={styles.textStyle}>Any other charges</Text>
      <Text style={styles.textStyle}>RS.0</Text>
     </View>

     </View>
     }

     <View style={styles.listItemStyle}>
      <Text>Markup</Text>
      <Text style={{color: '#0A233E',fontWeight: 800}}>RS.  {optWithDaysConfig[daysOption].opt[amountIndex].totalInterest}</Text>
     </View>

     <View style={styles.listItemStyle}>
      <Text>Disburse Amount</Text>
      <Text style={{color: '#0A233E',fontWeight: 800}}>RS.  {optWithDaysConfig[daysOption].opt[amountIndex].disburseMoney}</Text>
     </View>

     <View style={styles.listItemStyle}>
      <Text>Lump Sum Repayment Amount</Text>
      <Text style={{color: '#0A233E',fontWeight: 800}}>RS.  {optWithDaysConfig[daysOption].opt[amountIndex].dueRepayAmount}</Text>
     </View>

     <View style={styles.listItemStyle}>
      <Text>Due Date</Text>
      <Text style={{color: '#0A233E',fontWeight: 800}}>{optWithDaysConfig[daysOption].opt[amountIndex].repaymentDate}</Text>
     </View>

     { isVisiable === true && 
      <View style={styles.listItemStyle}>
      <Text style={{color: '#00B295',fontWeight: 'bold'}}>Late Payment Charges</Text>
      <Text style={{color: '#00B295',fontWeight: 'bold'}}>RS.  {(optWithDaysConfig[daysOption].opt[amountIndex].dailyLateFee)}</Text>
     </View>
     }

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
  },

  listItemStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 35,
    fontSize: 15,
    color:'#4F5E6F',
  },

  feeItemStyle: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingEnd: 12,
    height: 46,
    fontSize: 15,
    color:'#4F5E6F',
  },

  imageStyle: {
    width: 12,
    height: 12,
  },

  feeUnflodStyle: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
  },

  feeUnflodItemStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
  },

  textStyle: {
    fontSize: 12,
    fontWeight: 500,
    color: '#4F5E6F',
    fontWeight: 500,
  }

});