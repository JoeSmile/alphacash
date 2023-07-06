import { SafeAreaView, View, Text, Pressable, StyleSheet, TextInput, Button } from "react-native";
import { Formik, Field, Form } from 'formik';

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

export default function Emergency({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('values', values);
          navigation.push('Certificate')
        }}
        handleChange={values => console.log('values', values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>

            <View style={{height: 75, marginBottom: 15}}>
              <FSelect name="relation1" label="Reference Relationship 1" options={relationOptions} />
            </View>
            
            <View style={{height: 75, marginBottom: 15}}>
              <FTextInput name="name1" label="Reference Name 1" />
            </View>
            
            <View style={{height: 75, marginBottom: 15}}>
              <FTextInput name="number1" label="Reference Number 1" />
            </View>
            
            <View style={{height: 75, marginBottom: 15}}>
              <FSelect name="relation2" label="Reference Relationship 2" options={relationOptions} />
            </View>
            
            <View style={{height: 75, marginBottom: 15}}>
              <FTextInput name="name2" label="Reference Name 2" />
            </View>
            
            <View style={{height: 75, marginBottom: 15}}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: 'white'
  },

});
