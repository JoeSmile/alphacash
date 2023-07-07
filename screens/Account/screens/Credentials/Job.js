import { View, Text, Pressable, StyleSheet, ScrollView, Button } from "react-native";
import { Formik } from 'formik';

import { FTextInput, FSelect } from "@components/Inputs";
import {
  workFieldOptions, serviceLengthOptions,
  monthlyIncomeOptions, citiesOptions,
  provincesOptions,
  otherLoanOptions
} from '@const';
import Return from './Return';
import * as Yup from 'yup';

const initialValues = {
  "workField": '',
  "workName": "",
  "companyName": "",
  "companyPhone": "",
  "serviceLength": '',
  "monthlyIncome": "",
  "companyProvinceId": "",
  "companyCityId": "",
  "companyAddressDetail": "",
  "haveOtherLoans": "",
  "lendingInstitution": "",
  "loanAmount": '',
  "cityName": '',
  "provinceName": ''
}

const JobFormSchema = Yup.object().shape({
  workField: Yup.number()
    .required('Required'),
  workName: Yup.string()
    .required('Required'),
  companyName: Yup.string()
    .required('Required'),
  companyPhone: Yup.number()
    .required('Required'),
  serviceLength: Yup.number()
    .required('Required'),
  monthlyIncome: Yup.number()
    .required('Required'),
  companyProvinceId: Yup.number()
    .required('Required'),
  companyCityId: Yup.string()
    .required('Required'),
  companyAddressDetail: Yup.string()
    .required('Required'),
  haveOtherLoans: Yup.string(),
  lendingInstitution: Yup.string(),
  loanAmount: Yup.string(),
});

export default function Job({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('values', values);
          navigation.push('Emergency')
        }}
        validateOnChange={true}
        validateOnBlur={true}
        handleChange={values => console.log('values', values)}
        validationSchema={JobFormSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>
            <View style={styles.module}>
              <FSelect name="workField" label="Working Field" options={workFieldOptions} />
            </View>

             <View style={styles.module}>
              <FTextInput name="companyName" label="Company Name" />
              </View>
             <View style={styles.module}>
              <FTextInput name="companyPhone" label="Company Phone" />
              </View>
             <View style={styles.module}>
              <FSelect name="serviceLength" label="Length Service" options={serviceLengthOptions} />
              </View>
              <View style={styles.module}>
                <FSelect name="monthlyIncome" label="Monthly Income" options={monthlyIncomeOptions} />
              </View>

            <View style={{
              marginBottom: 15
            }}>
              <Text>Company Address</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                gap: 10
              }}>
                <View style={{flex: 1}}>
                  <FSelect name="companyProvinceId" label="Province" options={provincesOptions}
                    valueKey='province_id' labelKey='province_name'
                  />
                </View>
                <View style={{flex: 1}}>
                  <FSelect name="companyCityId" label="City" options={citiesOptions.filter(city => values['provinceId'] ? city.province_id == values['provinceId'] : true)}
                    valueKey='city_id' labelKey='city_name'
                  />
                </View>
              </View>
            </View>

            <View style={styles.module}>
              <FTextInput name="companyAddressDetail" label="Detail Address" />
            </View>

            <View style={{
              height: 80,
              marginBottom: 15,
              gap: 5,
            }}>
              <Text>Have Other Loans</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,

              }}>
                {
                  otherLoanOptions.map((item =>
                    <View
                      key={item.label}
                      style={{
                        flex: 1,
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
              <View style={{height:180, marginBottom: 20}}>
                <View style={{height: 80, marginBottom: 15}}>
                  <FTextInput name="lendingInstitution" label="Lending Institution" />
                </View>
                <View style={{height: 80}}>
                  <FTextInput name="loanAmount" label="Loan Amount" />
                </View>
              </View>
            }

            <View style={{ width: 300, alignSelf: 'center' }}>
              <Button type="submit" style={styles.submitBtn} onPress={handleSubmit} title='Next' />
            </View>
          </>
        )}
      </Formik>
      <Return />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 900,
    backgroundColor: 'white'
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: 'white'
  },
  loanBtn: {
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#99A5B4'
  },
  loanBtnSelected: {
    color: '#032BB1',
    backgroundColor: '#E6E8F7'
  },
  module: {
    height: 90,
    marginBottom: 15
  }
});
