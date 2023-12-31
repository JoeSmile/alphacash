import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";
//import { Picker } from "@ant-design/react-native";
import { useFormikContext } from "formik";
import { useI18n } from "@hooks/useI18n";
import {
  getWritingDirectionStyle,
  getMarginRightOrLeft,
  getPaddingRightOrLeft,
  getRTLView,
  getTextAlign,
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
          onValueChange={(v, idx) => {
            console.log("name, v", name, v);
            context.setFieldValue(name, v);
            if (afterChange) {
              afterChange({
                name,
                value: v,
              });
            }
          }}
          onFocus={() => {
            setFocused(true);
            if (!context.values[name]) {
              const item0 = options[0] || {};
              const v = valueKey ? item0[valueKey] : item0.value;
              context.setFieldValue(name, v);
              afterChange &&
                afterChange({
                  name,
                  value: v,
                });
            }
          }}
          onBlur={() => setFocused(false)}
          selectedValue={context.values[name] || "sos"}
          style={[
            {
              padding: 0,
              paddingLeft: 3,
              color: "#0A233E",
            },
            meta.touched && meta.error ? styles.error : {},
            getTextAlign(locale),
          ]}
          itemStyle={{ color: "red" }}
        >
          {!context.values[name] && !focused && (
            <Picker.Item label="" value="sos" />
          )}
          {options.map((item, index) => (
            <Picker.Item
              style={[getRTLView(locale)]}
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
