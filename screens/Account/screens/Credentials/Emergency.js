import { View, StyleSheet, Button, ScrollView } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FTextInput, FSelect } from "@components/Inputs";
import {
  relationOptions
} from '@const';
import Return from './Return';

const initialValues = {
  relation1: '',
  name1: '',
  number1: '',
  relation2: '',
  name2: '',
  number2: '',
}

const EmergencyFormSchema = Yup.object().shape({
  relation1: Yup.number()
    .required('Required'),
  name1: Yup.number()
    .required('Required'),
  number1: Yup.string()
    .required('Required'),
  relation2: Yup.number()
    .required('Required'),
  name2: Yup.number()
    .required('Required'),
  number2: Yup.string()
    .required('Required')
});

export default function Emergency({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log('values', values);
            navigation.push('Certificate')
          }}
          validateOnChange={true}
          validateOnBlur={true}
          handleChange={values => console.log('values', values)}
          validationSchema={EmergencyFormSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <>
              <View style={styles.module}>
                <FSelect name="relation1" label="Reference Relationship 1" options={relationOptions} />
              </View>
              
              <View style={styles.module}>
                <FTextInput name="name1" label="Reference Name 1" />
              </View>
              
              <View style={styles.module}>
                <FTextInput name="number1" label="Reference Number 1" />
              </View>
              
              <View style={styles.module}>
                <FSelect name="relation2" label="Reference Relationship 2" options={relationOptions} />
              </View>
              
              <View style={styles.module}>
                <FTextInput name="name2" label="Reference Name 2" />
              </View>
              
              <View style={styles.module}>
                <FTextInput name="number2" label="Reference Number 2" />
              </View>

              <View style={{ width: 300, alignSelf: 'center' }}>
                <Button type="submit" style={styles.submitBtn} onPress={handleSubmit} title='Next' />
              </View>
            </>
          )}
        </Formik>
        <Return />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: 'white'
  },
  module: {
    height: 90, marginBottom: 15
  }
});
