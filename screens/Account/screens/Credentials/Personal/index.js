import { SafeAreaView, View, Text, Pressable, StyleSheet, Image, TextInput, Button } from "react-native";
import { Formik, Field, Form } from 'formik';
import { FDatePicker} from '@components/FDatePicker';
import { Picker } from '@react-native-picker/picker';
import { FTextInput, FSelect } from '@components/Inputs';

import {genderOptions, marriageOptions, educationOptions} from './consts';
import { provincesOptions } from '@const/provinces';
import { citiesOptions } from '@const/cities';

const initialValues = {
  name: '',
  birth: '',
  gender: '',
  cnic: '',
  education: '1',
  maritalStatus: '1',
  provinceId: '1',
  provinceName: '1',
  cityId: '1',
  addressDetail: '',
  email: ''
}
export default function Personal({navigation}) {

  return (
    <SafeAreaView >
    <View style={styles.container}>
        <View style={styles.safeTextContainer}>
        <View >
          <Image 
            source={require('@assets/images/mine_info_ic_safe.svg')}
            contentFit="cover"
            transition={1000}
            style={{
              width: '22px',
              height: '22px',
            }}/>
        </View>
          <Text style={styles.safeText}>
            The information you fill in is only used for credit
    evaluation and will never be used for other purposes.We use encryption to ensure your information security!
          </Text>
        </View>
      {/* form */}

      <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log('values', values);
            navigation.push('Job')
          }}
          handleChange={values => console.log('values', values)}
          
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <FTextInput name="name" label="Name" type="text"/>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                gap: '10px'
              }}>
               <FTextInput name="birth" label="Date of Birth" />
               <FSelect name="gender" label="Gender" options={genderOptions}/>
              </View>

              <FTextInput name="cnic" label="CNIC" />
              
              <FSelect name="education" label="Education" options={educationOptions}/>

              <FSelect name="maritalStatus" label="Marital Status" options={marriageOptions}/>

              <View style={{
                marginVertical: '15px'
              }}>
                <Text>Residential Address</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  gap: '10px'
                }}>
                  <FSelect name="provinceId" label="Province" options={provincesOptions}
                    valueKey='province_id' labelKey='province_name' containerStyle={{paddingTop: 0}}
                  />

                  <FSelect name="cityId" label="City" options={citiesOptions.filter(city => values['provinceId'] ? city.province_id == values['provinceId'] : true)}
                    valueKey='city_id' labelKey='city_name' 
                    containerStyle={{paddingTop: 0}}
                  />
                </View>
              </View>

              <FTextInput name="addressDetail" label="Detailed Address" />

              <FTextInput name="email" label="Email" />
              <View style={{width: '300px', alignSelf: 'center'}}>
                <Button type="submit" style={styles.submitBtn} onPress={handleSubmit} title='Next' />
              </View>
            </>
          )}
        </Formik>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{color: '#4F5E6F', textAlign: 'center', marginVertical: '15px'}}>Return</Text>
        </Pressable>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "15px",
    paddingVertical: "15px",
    backgroundColor: 'white'
  },
  safeTextContainer: {
    border: "1px solid #698EC7",
    borderRadius: '4px',
    backgroundColor: '#F6F9FD',
    paddingHorizontal: '15px',
    paddingVertical: '15px',
    flexDirection:'row'
  },  
  safeText: {
    marginLeft: '10px',
    fontSize: '12px',
    color:'#4F5E6F'
  },
  inputContainer: {
    width: '100%',
    marginBottom: '20px'
  }, 
  label: {
    marginBottom:'10px'
  }, 
  textInput: {
    paddingLeft: '15px',
    height: 50,
    width: 'auto',
    backgroundColor: '#F4F5F7',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  picker: {
    // flex: 1,
      width: "100%",
      height: 44,
      borderRadius: '4px',
      paddingHorizontal: '4px'
    },
    pickerItem: {
      height: 44
    },
  submitBtn: {
    height:'50px',
    borderRadius: '3px',
    color: 'white'
  }
});