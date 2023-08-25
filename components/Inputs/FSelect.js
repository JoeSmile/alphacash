import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useFormikContext } from "formik";
import { useI18n } from "@hooks/useI18n";
import {
  getWritingDirectionStyle,
  getMarginRightOrLeft,
  getPaddingRightOrLeft,
} from "@styles";

// const defaultOptions = [{ label: '男', value: '1' }, { label: '女', value: '2' }]

export function FSelect({
  label,
  name,
  options = [],
  containerStyle = {},
  labelKey = "",
  valueKey = "",
  enabledKey = "",
  suffix = "",
  afterChange = "",
  ...props
}) {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);
  const { i18n, locale } = useI18n();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
   console.log('Sun >>> context == ' + context.values[name])
  }, []);
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
          justifyContent: "center",
          borderColor: focused ? "#0825B8" : "#C0C4D6",
          borderRadius: 10,
          borderWidth: 1,
          height: 48,
        }}
      >
        <Picker
          enabled={enabledKey ? !!context.values[enabledKey] : true}
          mode="dropdown"
          onValueChange={(v) => {
            console.log('name, v', name, v)
            context.setFieldValue(name, v);
            if (afterChange) {
              afterChange({
                name,
                value: v,
              });
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectedValue={context.values[name]}
          style={[
            {
              padding: 0,
              paddingLeft: 15,
              color: "#0A233E",
            },
            meta.touched && meta.error ? styles.error : {},
          ]}
        >
          {!context.values[name] && (
            <Picker.Item label="Please select an option..." value="" />
          )}
          {options.map((item, index) => (
            <Picker.Item
              label={labelKey ? item[labelKey] : item.label}
              value={valueKey ? item[valueKey] : item.value}
              key={`${item.value}_${index}`}
            />
          ))}
        </Picker>
      </View>
      {meta.touched && meta.error ? (
        <Text className="error" style={{ color: "#E53F31" }}>
          {meta.error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    lineHeight: 20,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "#E53F31",
  },
});
