import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { useFormikContext, useField } from "formik";
import { useI18n } from "@hooks/useI18n";

export const FTextInput = ({
  label,
  hintValue = "",
  containerStyle = {},
  name,
  keyboardType = "default",
  editable = true,
  rightIcon = "",
  displayDigit = 0,
  suffix=''
}) => {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);
  const { i18n } = useI18n();

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <View>
        <Text style={styles.label}>{i18n.t(label)}{` ${suffix}`}</Text>
      </View>

      <View
        style={{
          height: 55,
          position: "relative",
        }}
      >
        <TextInput
          editable={editable}
          keyboardType={keyboardType}
          placeholderTextColor={"#8899AC"}
          placeholder={hintValue}
          style={[
            styles.textInput,
            meta.touched && meta.error ? styles.error : {},
          ]}
          value={context.values[name]}
          onChangeText={(v) => {
            context.setFieldValue(name, v);
          }}
        />
        {
          !!displayDigit && <Text style={{
            position: 'absolute',
            right: 10,
            height: 55,
            lineHeight: 55,
            color: '#8899AC'
          }}>
            {`${context?.values[name]?.length ?? 0}/${displayDigit}`}
          </Text>
        }
        {!!rightIcon && (
          <View
            style={{
              position: "absolute",
              right: 12,
              top: 13,
            }}
          >
            <Image
              source={rightIcon}
              contentFit="cover"
              transition={200}
              style={{ width: 25, height: 25 }}
            />
          </View>
        )}
      </View>
      {meta.touched && meta.error ? (
        <Text
          className="error"
          style={{
            color: "#E53F31",
          }}
        >
          {meta.error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 80,
  },
  label: {
    height: 20,
    marginBottom: 6,
    color: "#4F5E6F",
    fontSize: 14,
  },
  textInput: {
    paddingLeft: 15,
    paddingRight: 35,
    width: "auto",
    height: 55,
    borderColor: "#C0C4D6",
    borderWidth: 1,
    borderRadius: 10,
    //outlineColor: '#0825B8'
  },
  error: {
    borderColor: "#E53F31",
  },
});
