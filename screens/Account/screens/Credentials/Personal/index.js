import { SafeAreaView, View, Text, Pressable, StyleSheet, Image, TextInput, Button } from "react-native";
import { Formik, Field, Form } from 'formik';
import { FDatePicker } from '@components/FDatePicker';
import { Picker } from '@react-native-picker/picker';
import { FTextInput, FSelect } from '@components/Inputs';
import Return from '../Return';
import SafeIntro from '../SafeIntro';
import {
  provincesOptions, citiesOptions, genderOptions,
  marriageOptions, educationOptions
} from '@const';

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
export default function Personal({ navigation }) {

  return (
    <SafeAreaView >
      <View style={styles.container}>
        <SafeIntro safeText=" The information you fill in is only used for credit
      evaluation and wi ll never be used for other purposes.We use encryption to ensure your information security!"/>
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
              <FTextInput name="name" label="Name" type="text" />
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                gap: 10
              }}>
                <FTextInput name="birth" label="Date of Birth" />
                <FSelect name="gender" label="Gender" options={genderOptions} />
              </View>

              <FTextInput name="cnic" label="CNIC" />

              <FSelect name="education" label="Education" options={educationOptions} />

              <FSelect name="maritalStatus" label="Marital Status" options={marriageOptions} />

              <View style={{
                marginVertical: 15
              }}>
                <Text>Residential Address</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: "space-between",
                  gap: 10
                }}>
                  <FSelect name="provinceId" label="Province" options={provincesOptions}
                    valueKey='province_id' labelKey='province_name'
                  />

                  <FSelect name="cityId" label="City" options={citiesOptions.filter(city => values['provinceId'] ? city.province_id == values['provinceId'] : true)}
                    valueKey='city_id' labelKey='city_name'
                  />
                </View>
              </View>

              <FTextInput name="addressDetail" label="Detailed Address" />

              <FTextInput name="email" label="Email" />
              <View style={{ width: 300, alignSelf: 'center' }}>
                <Button type="submit" style={styles.submitBtn} onPress={handleSubmit} title='Next' />
              </View>
            </>
          )}
        </Formik>
        <Return />
      </View>
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
  inputContainer: {
    width: '100%',
    marginBottom: 20
  },
  label: {
    marginBottom: 10
  },
  textInput: {
    paddingLeft: 15,
    height: 50,
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
    height: 50,
    borderRadius: 3,
    color: 'white'
  }
});