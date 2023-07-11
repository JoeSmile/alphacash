import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormikContext, useField } from 'formik';

export const FTextInput = ({ label, hintValue = "", containerStyle = {}, name }) => {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <View>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>

      <View style={{
         height: 55,
      }}>
        <TextInput
          placeholder={hintValue}
          style={[styles.textInput, meta.touched && meta.error ? styles.error: {}]}
          value={context.values[name]}
          onChangeText={(v) => {
            context.setFieldValue(name, v)
          }}
        />
      </View>
      {meta.touched && meta.error ? (
        <Text className="error" style={{
          color: '#E53F31'
        }}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 80,
  },
  label: {
    height: 15,
    marginBottom: 10
  },
  textInput: {
    paddingLeft: 15,
    width: 'auto',
    height: 55,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  error: {
    borderColor: '#E53F31'
  }
});