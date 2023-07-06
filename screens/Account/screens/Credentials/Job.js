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

export default function Job({ navigation }) {
  return (
    <ScrollView style={styles.container}>
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
            <View style={{
              height: 80,
              marginBottom: 10
            }}>
              <FSelect name="workField" label="Working Field" options={workFieldOptions} />
            </View>

             <View style={{
              height: 80,
              marginBottom: 10
            }}>
              <FTextInput name="companyName" label="Company Name" />
              </View>
             <View style={{
              height: 80,
              marginBottom: 10
            }}>
              <FTextInput name="companyPhone" label="Company Phone" />
              </View>
             <View style={{
              height: 80,
              marginBottom: 10
            }}>
              <FSelect name="serviceLength" label="Length Service" options={serviceLengthOptions} />
              </View>
              <View style={{
              height: 80,
              marginBottom: 10
            }}>
                <FSelect name="monthlyIncome" label="Monthly Income" options={monthlyIncomeOptions} />
              </View>

            <View style={{
              height: 100,
              marginBottom: 15
            }}>
              <Text>Company Address</Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                gap: 10
              }}>
                <FSelect name="companyProvinceId" label="Province" options={provincesOptions}
                  valueKey='province_id' labelKey='province_name'
                />

                <FSelect name="companyCityId" label="City" options={citiesOptions.filter(city => values['provinceId'] ? city.province_id == values['provinceId'] : true)}
                  valueKey='city_id' labelKey='city_name'
                />
              </View>
            </View>

            <View style={{
              height: 80,
              marginBottom: 10
            }}>
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

  }
});
