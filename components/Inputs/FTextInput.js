import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

 export const FTextInput = ({ label, containerStyle={}, name }) => {
    const context = useFormikContext(name);
    const meta = context.getFieldMeta(name);
    return (
      <View style={[styles.inputContainer, containerStyle]}>
        <Text style={styles.label}>
          {label}
        </Text>
        <TextInput
          style={styles.textInput}
          value={context.values[name]}
          onChangeText={(v)=> {
            context.setFieldValue(name, v)
          }}
        />
        {meta.touched && meta.error ? (
          <Text className="error">{meta.error}</Text>
        ) : null}
      </View>
    );
  };

const styles = StyleSheet.create({
  inputContainer: {
    flex: '1',
    marginBottom: '20px'
  }, 
  label: {
    marginBottom:'5px'
  }, 
  textInput: {
    paddingLeft: '15px',
    height: 50,
    width: 'auto',
    // backgroundColor: '#F4F5F7',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});