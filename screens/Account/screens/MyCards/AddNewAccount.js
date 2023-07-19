/* tslint:disable:no-console */
import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet, Pressable } from 'react-native'
import { Formik } from 'formik';
import { FTextInput, FSelect } from '@components/Inputs';
import { useAddAccount, useBankList } from '@apis';
import { FButton } from '@components/FButton';
import { Toast } from '@ant-design/react-native';
import * as Yup from 'yup';

const tabs = [{
  title: 'Easypaisa',
  source: require("@assets/images/loan_ic_easypaisa.png"),
  name: 'EasyPaisa',
  type: 2,
  ewalletType: 1,
  tabId: 1,
},
{
  title: 'Jazzcash',
  source: require("@assets/images/loan_ic_jazzcash.png"),
  type: 2,
  name: 'Jazzcash',
  ewalletType: 2,
  tabId: 2,
},{
  title: 'Bank Card',
  source: require("@assets/images/loan_ic_bank.png"),
  type: 1,
  tabId: 3,
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

const AccountFormSchema = Yup.object().shape({
  account: Yup.string()
    .required('Required')
    .test('len', 'Please input correct account number', (val, context) => {
      if (context.parent.type == 1) {
        //bank
        return val.match('^[A-Za-z0-9]+$')
      } else {
        //ewallet
        return val.match('^[0-9]*$')
      }
    }),

});


const defaultEmptyForm = {
  account: '',
  // bank
  bankId: '',
  bankAccountName: '',
  // common
  name: 'EasyPaisa',
  type: 2,
  ewalletType: 1
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

export function AddNewAccount({navigation, route}) {
  const [initialData, setInitialData] = useState();

  const [selectedTab, setSelectedTab] = useState({});
  const { mutate: addAccount, data: result } = useAddAccount();
  const { mutate: getBankList, data: rawList, isLoading} = useBankList();

  useEffect(() => {
    getBankList();
  }, []);
  
  React.useEffect(() => {
    const card = route.params ? route.params.card : {};
    setInitialData(
      {
        account: card.bankAccount || card.ewalletAccount || defaultEmptyForm.account,
        // bank
        bankId: card.bankId || defaultEmptyForm.bankId,
        bankAccountName: card.bankAccountName || defaultEmptyForm.bankAccountName,
        // common
        name: card.ewalletName || 'EasyPaisa',
        type: card.type || defaultEmptyForm.type,
        ewalletType: card.ewalletId || 'EasyPaisa'.ewalletType,
        id: card.bankAccountId || card.ewalletId || ''
      }
    )
    setSelectedTab({
      type: card.type || 2,
      ewalletType: card.ewalletType || 1,
      name: card.ewalletName || 'EasyPaisa',
      tabId: card.type ? (card.type == 1 ? 3 : card.ewalletType): 1
    })
  }, [route]);

  const bankOptions = useMemo(() => {
    if (!isLoading && rawList) {
      return rawList.data.data
    }
    return []
  }, [rawList])

  useEffect(() => {
    if (!result) return;
    if (result.data.error_code == 1) {
      navigation.goBack();
    } else {
      Toast.info({
        content: result.data.msg,
        duration: 3,
      })
    }
  }, [result])

  return (
    <View style={{ flex: 1,  backgroundColor: 'white', padding: 15 }}>
      {!!initialData &&  <Formik
          initialValues={initialData}
          onSubmit={values => {
            let params = selectedTab.type == 1 ? {
              // bank
              type: selectedTab.type,
              bankAccountName: values.bankAccountName,
              bankAccount: values.account,
              bankId: values.bankId,
              bankAccountId: values.id
            } : {
              type: selectedTab.type,
              ewalletType: selectedTab.ewalletType,
              ewalletAccount: values.account,
              ewalletId: values.id,
              ewalletName: selectedTab.name
            };
            addAccount(params);
          }}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={AccountFormSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, context, setValues }) => (
            <>
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
                      <Pressable style={[styles.tab, selectedTab.tabId === tab.tabId ? {borderBottomWidth: 3, borderBottomColor: '#0825B8'} : '']} 
                        onPress={() => {
                          setSelectedTab({
                            tabId: tab.tabId,
                            name: tab.name,
                            type: tab.type,
                            ewalletType: tab.ewalletType
                          });
                          setValues({
                            ...values,
                            name: tab.name,
                            type: tab.type,
                            ewalletType: tab.ewalletType
                          })
                        }
                        }>
                        <Image source={tab.source}
                          contentFit="cover"
                          transition={200}
                          style={{ width: 32, height: 32, marginBottom: 10}} 
                        />
                        <Text style={{
                          color: selectedTab.tabId === tab.tabId ? '#0A233E' : '#8899AC',
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
            {
              selectedTab.type !== 1 && <View style={{
                marginBottom: 25
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
                {
                !isLoading && rawList && <View style={styles.inputContainer}>
                    <FSelect name="bankId" label="Bank Name" 
                       valueKey='bank_id' labelKey='full_name'
                    options={bankOptions} />
                  </View>
                }
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
