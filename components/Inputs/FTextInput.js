import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { useFormikContext, useField } from "formik";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle, getMarginRightOrLeft } from "@styles";

export const FTextInput = ({
  label,
  hintValue = "",
  containerStyle = {},
  name,
  keyboardType = "default",
  editable = true,
  rightIcon = "",
  displayDigit = 0,
  suffix = "",
}) => {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);
  const { i18n, locale } = useI18n();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[containerStyle, getWritingDirectionStyle(locale)]}>
      <View>
        <Text
          style={[
            styles.label,
            getWritingDirectionStyle(locale),
            { color: focused ? "#0825B8" : "#4F5E6F" },
          ]}
        >
          {`${i18n.t(label)} ${suffix}`}
        </Text>
      </View>

      <View
        style={{
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!!displayDigit && (
          <Text
            style={{
              position: "absolute",
              right: 10,
              lineHeight: 48,
              color: "#8899AC",
            }}
          >
            {`${context?.values[name]?.length ?? 0}/${displayDigit}`}
          </Text>
        )}
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
  label: {
    lineHeight: 20,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  textInput: {
    paddingLeft: 15,
    paddingRight: 35,
    width: "auto",
    height: 48,
    borderColor: "#C0C4D6",
    borderWidth: 1,
    borderRadius: 10,
    //outlineColor: '#0825B8'
  },
  error: {
    borderColor: "#E53F31",
  },
});
