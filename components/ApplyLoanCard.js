import { View, Text, StyleSheet, Image,FlatList,TouchableOpacity,Pressable  } from "react-native";
import { useEffect, useState } from "react";
import { useI18n, LocaleTypes } from "@hooks/useI18n";


export default function ApplyLoanCard ({ 
  optWithDaysConfig,
  setOptWithDaysConfig,
  daysOption,
  setDaysOption,
  amountIndex,
  setAmountIndex,
 }) {
  const { i18n } = useI18n();


  const handleItemPress = (item,index) => {
    if(item.isApply){
      console.log('Item pressed:', item + index);
      // 处理点击事件的逻辑
      setDaysOption(index)
    } else {
       return
    }
  };

  const Item = ({ title,index,isApply }) => {
    if(isApply){
      return (
      <View style={[styles.loanTermUnCheckedStyle, index === daysOption && styles.loanTermCheckedStyle]}>
        <Text style={{color: '#262626', fontSize: 14,fontWeight: 'bold'}}>{title} Days</Text>
      </View>
      )
    } else {
      return (
      <View style={styles.loanTermUnCheckedStyle}>
       <Text style={{color: '#262626', fontSize: 14,fontWeight: 'bold'}}>{title} Days</Text>
       <Image  source={require('@assets/applyLoan/loan_ic_lock.png')} style={{width: 14,height: 14,marginHorizontal: 2}}></Image>
     </View>
      )
    }
  }

  return (
    <View style={styles.container}>
    <Text style={{marginTop: 24,fontSize: 15,color: '#0A233E',fontWeight: 500}}>{i18n.t('LoanAmount')}</Text>

    <View style={styles.loanAmountStyle}>
    <TouchableOpacity onPress={() => {
        console.log("optWithDaysConfig:", optWithDaysConfig[daysOption].opt);
        console.log("daysOption:", daysOption);
        console.log("amountIndex:", amountIndex);
         if(amountIndex && optWithDaysConfig[daysOption] && amountIndex < optWithDaysConfig[daysOption].opt.length ){
        setAmountIndex(amountIndex - 1)
      }
      }}>
      <Image 
      source={require('@assets/applyLoan/loan_btn_minus_disabled.png')} 
      style={styles.imageStyle} 
      />
       </TouchableOpacity>
      <Text style={{  color: '#0A233E',fontSize: 29,fontWeight: 'bold'}}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].applyAmount}</Text>
      <TouchableOpacity  onPress={() => {
         console.log("optWithDaysConfig:", optWithDaysConfig[daysOption].opt);
         console.log("daysOption:", daysOption);
         console.log("amountIndex:", amountIndex);
        if(optWithDaysConfig[daysOption] && amountIndex < optWithDaysConfig[daysOption].opt.length -1 ){
          setAmountIndex(amountIndex + 1)
        }
      }}>
      <Image 
      source={require('@assets/applyLoan/loan_btn_plus_disabled.png')} 
      style={styles.imageStyle}/>
       </TouchableOpacity>
    </View>

    <View style={{height: 1,backgroundColor: '#E0E3E8',marginTop: 8,width:'88%'}}></View>

    <Text style={{color: '#0A233E',fontSize: 15, marginTop: 24,fontWeight: 500}}>{i18n.t('LoanTerm')}</Text>

    <View style={styles.loanTermBgStyle}>
      {
        optWithDaysConfig.map((item,index) => 
        <TouchableOpacity key={item.days} onPress={() => handleItemPress(item,index)}>
        <Item
        title={item.days} 
        index={index}
        isApply={item.isApply}
        ></Item>
        </TouchableOpacity>
        )
      }
    </View>

    <View style={{marginTop: 18}}></View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
  },

  imageStyle: {
    width: 27,
    height: 27,
  },

  loanAmountStyle: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    alignItems: 'center'
  },

  loanTermBgStyle: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  
  loanTermCheckedStyle: {
    width: 135,
    height: 42,
    borderColor: '#00B295',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6
  },

  loanTermUnCheckedStyle: {
    width: 135,
    height: 42,
    borderColor: '#E0E3E8',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },

});