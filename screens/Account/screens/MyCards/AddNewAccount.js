/* tslint:disable:no-console */
import React, { useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet, Pressable } from 'react-native'
import { Formik } from 'formik';
import { FTextInput, FSelect } from '@components/Inputs';
import { genderOptions } from '@const';
import { useAddAccount } from '@apis';
import { FButton } from '@components/FButton';

const tabs = [{
  title: 'Easypaisa',
  source: require("@assets/images/loan_ic_easypaisa.png"),
  name: 'EasyPaisa',
  type: 2,
  ewalletType: 1,
  id: 1
},
{
  title: 'Jazzcash',
  source: require("@assets/images/loan_ic_jazzcash.png"),
  type: 2,
  name: 'Jazzcash',
  ewalletType: 2,
  id: 2
},{
  title: 'Bank Card',
  source: require("@assets/images/loan_ic_bank.png"),
  type: 1,
  id: 1
}]

const style = {
  backgroundColor: '#fff',
  flex: 1
}

const noticeStyle = {
  color: '#8899AC',
  fontSize: 12,
  lineHeight: 20
}

const defaultEmptyForm = {
  account: '01238137215',
  // bank
  bankName: 'Askari Commercial Bank Limited',
  bankAccountName: '22222'
}

function Notice () {
  return <View style={{marginTop: 30}}>
    <Text style={noticeStyle}>
    Notice:
    </Text>
    <Text style={noticeStyle}>
      1. Please fill in your collection account number. When your application is approved, the loan will be issued to your collection account number. Please check the collection account number carefully to avoid unsuccessful payment;
    </Text>
    <Text style={noticeStyle}>
      2. You can apply for the first loan after the receiving account is successfully added;
    </Text>
    <Text style={noticeStyle}>
      3. When you fill in Jazzcash as the receiving account number, please fill in the Jazzcash account number that matches your CNIC, otherwise the payment will not be successful.
    </Text>
  </View>
}

export function AddNewAccount() {
  const [selectedTab, setSelectedTab] = useState({
    type: 2,
    ewalletType: 1,
    name: 'EasyPaisa',
    id: 1
  });
  const {mutate: addAccount} = useAddAccount();
  return (
    <View style={{ flex: 1,  backgroundColor: 'white', padding: 15 }}>
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 15, 
        borderBottomColor: '#E0E3E8', 
        borderBottomWidth: 2,
        marginBottom: 30
      }}>
        {
          tabs.map(tab => {
            return (
              <View key={tab.title} > 
                <Pressable style={[styles.tab, selectedTab.id === tab.id && selectedTab.type === tab.type ? {borderBottomWidth: 3, borderBottomColor: '#0825B8'} : '']} 
                  onPress={() => setSelectedTab({
                    id: tab.id,
                    name: tab.name,
                    type: tab.type,
                    ewalletType: selectedTab.ewalletType
                  })}>
                  <Image source={tab.source}
                    contentFit="cover"
                    transition={200}
                    style={{ width: 32, height: 32, marginBottom: 10}} 
                  />
                  <Text style={{
                    color: selectedTab.id === tab.id && selectedTab.type === tab.type ? '#0A233E' : '#8899AC',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {tab.title}
                  </Text>
                </Pressable>
              </View>
            )
          })
        }
      </View>

      {!!defaultEmptyForm &&  <Formik
          initialValues={defaultEmptyForm}
          onSubmit={values => {
            let params = selectedTab.type == 1 ? {
              // bank
              type: selectedTab.type,
              bankAccountName: values.bankAccountName,
              bankAccount: values.account,
              bankName: values.bankName || "Askari Commercial Bank Limited",
              bankId: 2,
              bankAccountId: selectedTab.id
            } : {
              type: selectedTab.type,
              ewalletType: selectedTab.ewalletType,
              ewalletAccount: values.account,
              ewalletId: selectedTab.id,
              ewalletName: selectedTab.name
            };
            addAccount(params);
          }}
          validateOnChange={true}
          validateOnBlur={true}
          // validationSchema={PersonalFormSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
            {
              selectedTab.type !== 1 && <View style={{
                marginBottom: 15
              }}>
                <FTextInput 
                  name="account" 
                  label='Mobile Wallet Account' 
                  type="text" 
                  rightIcon={require("@assets/images/loan_ic_edit.png")}  
                />
              </View>
            }
           
            {/* bank account form */}
            {
              selectedTab.type == 1 && <View>
                <View style={styles.inputContainer}>
                  <FTextInput 
                    name="bankAccountName" 
                    label='Bank Account Name'
                    type="text" 
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FTextInput 
                    name="account" 
                    label='Bank Account'
                    type="text" 
                    rightIcon={require("@assets/images/loan_ic_edit.png")}  
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FSelect name="bankName" label="Bank Name" options={genderOptions} />
                </View>
              </View>
            }
              <FButton
                onPress={handleSubmit}
                title='Submit'
              />
            </>
          )}
         
          </Formik>
      }
      <Notice/> 
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
   height: '100%',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'white',
   paddingBottom: 15
  },
  inputContainer:  {
    marginBottom: 15
  }
});
