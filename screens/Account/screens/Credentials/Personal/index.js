import { SafeAreaView, View, Text, Pressable, StyleSheet, 
  ScrollView, Button } from "react-native";
import { Formik } from 'formik';
import { FDatePicker } from '@components/FDatePicker';
import { Picker } from '@react-native-picker/picker';
import { FTextInput, FSelect } from '@components/Inputs';
import Return from '../Return';
import SafeIntro from '../SafeIntro';
import * as Yup from 'yup';
import {
  provincesOptions, citiesOptions, genderOptions,
  marriageOptions, educationOptions
} from '@const';

const initialValues = {
  name: '',
  birth: '',
  gender: '',
  cnic: '',
  education: '',
  maritalStatus: '',
  provinceId: '',
  provinceName: '',
  cityId: '',
  addressDetail: '',
  email: ''
}

const PersonalForm = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  birth: Yup.string()
    .required('Required'),
  cnic: Yup.string()
    .required('Required'),
  gender: Yup.number()
    .required('Required'),
  education: Yup.number()
    .required('Required'),
  maritalStatus: Yup.number()
    .required('Required'),
  provinceId: Yup.number()
    .required('Required'),
  provinceName: Yup.string()
    .required('Required'),
  cityId: Yup.number()
    .required('Required'),
  addressDetail: Yup.string()
  .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function Personal({ navigation }) {

  return (
    <SafeAreaView >
    <ScrollView>
    <View style={styles.container}>
      <SafeIntro safeText=" The information you fill in is only used for credit
        evaluation and wi ll never be used for other purposes.We use encryption to ensure your information security!"/>
          <View style={{
              marginBottom: 15,
              height: 750
            }}
          >
          <Formik
              initialValues={initialValues}
              onSubmit={values => {
                console.log('values', values);
                navigation.push('Job')
              }}
              handleChange={values => console.log('values', values)}
              validationSchema={PersonalForm}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={{height: 65, marginBottom: 15}}>
                    <FTextInput name="name" label="Name" type="text" />
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    gap: 10,
                    height: 65,
                    marginBottom: 15
                  }}>
                    <View style={{height: 65, marginBottom: 15, flex: 1}}>
                      <FTextInput name="birth" label="Date of Birth" />
                    </View>
                    <View style={{height: 65, marginBottom: 15, flex: 1}}>
                      <FSelect name="gender" label="Gender" options={genderOptions} />
                    </View>
                  </View>

                  <View style={{height: 65, marginBottom: 15}}>
                    <FTextInput name="cnic" label="CNIC" />
                  </View>
                  
                  <View style={{height: 65, marginBottom: 15}}>
                    <FSelect name="education" label="Education" options={educationOptions} />
                  </View>

                  <View style={{
                    height: 65,
                    marginBottom: 15
                  }}>
                    <FSelect name="maritalStatus" label="Marital Status" options={marriageOptions} />
                  </View>

                  <View style={{
                    marginBottom: 15,
                  }}>
                    <Text>Residential Address</Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: "space-between",
                      gap: 10
                    }}>
                      <View style={{flex: 1}}>
                        <FSelect name="provinceId" label="Province" options={provincesOptions}
                          valueKey='province_id' labelKey='province_name'
                        />
                      </View>
                      
                      <View style={{flex: 1}}>
                        <FSelect name="cityId" label="City" options={citiesOptions.filter(city => values['provinceId'] ? city.province_id == values['provinceId'] : true)}
                          valueKey='city_id' labelKey='city_name'
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{height: 65, marginBottom: 15}}>
                    <FTextInput name="addressDetail" label="Detailed Address" />
                  </View>
                    
                  <View style={{height: 65, marginBottom: 15}}>
                    <FTextInput name="email" label="Email" />
                  </View>


                  <View style={{ height: 65, width: 300, marginBottom: 15, alignSelf: 'center' }}>
                    <Button type="submit" style={styles.submitBtn} onPress={handleSubmit} title='Next' />
                  </View>
                </>
              )}
            </Formik>
            </View>
            <Return />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  safeTextContainer: {
    borderRadius: 4,
    backgroundColor: '#F6F9FD',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row'
  },
  safeText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#4F5E6F'
  },
  textInput: {
    paddingLeft: 15,
    height: 65,
    width: 'auto',
    backgroundColor: '#F4F5F7',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  picker: {
    width: "100%",
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 4
  },
  pickerItem: {
    height: 44
  },
  submitBtn: {
    height: 65,
    borderRadius: 3,
    color: 'white'
  }
});