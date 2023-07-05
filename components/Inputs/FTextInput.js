import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

export const FTextInput = ({ label, containerStyle = {}, name }) => {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>
        {label}
      </Text>
      <View style={{
        height: 30
      }}>
        <TextInput
          style={styles.textInput}
          value={context.values[name]}
          onChangeText={(v) => {
            context.setFieldValue(name, v)
          }}
        />
      </View>
      {meta.touched && meta.error ? (
        <Text className="error">{meta.error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 45,
  },
  label: {
    marginBottom: 5,
    height: 15
  },
  textInput: {
    paddingLeft: 15,
    height: 50,
    width: 'auto',
    // backgroundColor: '#F4F5F7',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});