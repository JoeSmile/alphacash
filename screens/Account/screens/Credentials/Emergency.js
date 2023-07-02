import { SafeAreaView, View, Text, Pressable, StyleSheet, Image, TextInput, Button } from "react-native";
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

export default function Emergency({navigation}) {
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

            <FSelect name="relation1" label="Reference Relationship 1" options={relationOptions}/>
            <FTextInput name="name1" label="Reference Name 1"/>
            <FTextInput name="number1" label="Reference Number 1"/>

            <FSelect name="relation2" label="Reference Relationship 2" options={relationOptions}/>
            <FTextInput name="name2" label="Reference Name 2"/>
            <FTextInput name="number2" label="Reference Number 2"/>
                
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
    padding: '15px',
    backgroundColor: 'white' 
  },
  submitBtn: {
    height:'50px',
    borderRadius: '3px',
    color: 'white'
  },

});
