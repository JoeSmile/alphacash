import { SafeAreaView, View, Text, Pressable, StyleSheet, Image, TextInput, Button } from "react-native";
import { Formik, Field, Form } from 'formik';

import { FTextInput, FSelect } from "@components/Inputs";
import {
    workFieldOptions, serviceLengthOptions, 
    monthlyIncomeOptions, citiesOptions, 
    provincesOptions,
    otherLoanOptions  
} from '@const';
import Return from './Return';

const initialValues = {
  "workField": 1,
  "workName": "Farmer",
  "companyName": "fdgdfsg",
  "companyPhone": "02138293273",
  "serviceLength": 1,
  "monthlyIncome": 2,
  "companyProvinceId": "1",
  "companyCityId": "9",
  "companyAddressDetail": "dsfafsdf",
  "haveOtherLoans": 2,
  "lendingInstitution": "gsdfgfsd",
  "loanAmount": ''
}

export default function Job({navigation}) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('values', values);
          navigation.push('Emergency')
        }}
        handleChange={values => console.log('values', values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>

            <FSelect name="workField" label="Working Field" options={workFieldOptions}/>
            <FTextInput name="companyName" label="Company Name"/>
            <FTextInput name="companyPhone" label="Company Phone"/>
            <FSelect name="serviceLength" label="Length Service" options={serviceLengthOptions}/>
            <FSelect name="monthlyIncome" label="Monthly Income" options={monthlyIncomeOptions}/>
           
            <View style={{
                marginVertical: '15px'
              }}>
                <Text>Company Address</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  gap: '10px'
                }}>
                  <FSelect name="companyProvinceId" label="Province" options={provincesOptions}
                    valueKey='province_id' labelKey='province_name'
                  />

                  <FSelect name="companyCityId" label="City" options={citiesOptions.filter(city => values['provinceId'] ? city.province_id == values['provinceId'] : true)}
                    valueKey='city_id' labelKey='city_name' 
                  />
                </View>
              </View>
            
            <FTextInput name="companyAddressDetail" label="Detail Address"/>

            <View style={{
              marginBottom: '15px',
              gap:'5px',
            }}>
                <Text>Have Other Loans</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap:'10px',
                
                }}>
                {
                  otherLoanOptions.map((item => 
                    <View 
                      key={item.label}
                      style={{
                        flex: '1',
                      }}
                    >
                      <Pressable onPress={() => setFieldValue("haveOtherLoans", item.value)} >
                        <Text style={[styles.loanBtn, item.value == values['haveOtherLoans'] ? styles.loanBtnSelected : {}]}>{item.label}</Text>
                      </Pressable>
                    </View>
                  ))
                }
                </View>
            </View>
            
            {
              values['haveOtherLoans'] == 2 && 
              <>
                <FTextInput name="lendingInstitution" label="Lending Institution"/>
                <FTextInput name="loanAmount" label="Loan Amount"/>
              </>
            }
                
            <View style={{width: '300px', alignSelf: 'center'}}>
              <Button type="submit" style={styles.submitBtn} onPress={handleSubmit} title='Next' />
            </View>
          </>
        )}
      </Formik>
      <Return />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: '15px'
  },
  submitBtn: {
    height:'50px',
    borderRadius: '3px',
    color: 'white'
  },
  loanBtn: {
    border: '1px solid #C8CAD9',
    borderRadius: '10px',
    textAlign:'center',
    paddingVertical: '10px',
    color: '#99A5B4'
  },
  loanBtnSelected: {
    border: '1px solid #032BB1',
    color: '#032BB1',
    backgroundColor: '#E6E8F7' 

  }
});
