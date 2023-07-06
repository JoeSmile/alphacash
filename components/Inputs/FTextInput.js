import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

export const FTextInput = ({ label, containerStyle = {}, name }) => {
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
         height: 35,
      }}>
        <TextInput
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
    height: 60,
  },
  label: {
    height: 15,
    marginBottom: 5
  },
  textInput: {
    paddingLeft: 15,
    width: 'auto',
    height: 35,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  error: {
    borderColor: '#E53F31'
  }
});