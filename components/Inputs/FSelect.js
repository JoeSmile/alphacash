import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { List, Picker } from '@ant-design/react-native'
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


const CustomChildren = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View>
      <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>
        {props.extra}
      </Text>
    </View>
  </TouchableOpacity>
)

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
  const [_options, setOptions]= useState([]);

  useEffect(() => {
    const newOptions = options.map(option => {
      return {
        value: valueKey ? option[valueKey] : option['value'],
        label: labelKey ? option[labelKey] : option['label'],
      }
    })

    setOptions(newOptions)

  }, [options]);


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
          extra=""
          cols={1}
          data={_options}
          value={context.values[name] || ""}
          // onChange={(v) => this.setState({ pickerValue: v })}
          onOk={(v) => {
            context.setFieldValue(name, v)
            if (afterChange) {
              afterChange({
                name,
                value: v,
              })
            }
          }}
          title=""
          disabled={enabledKey ? !context.values[enabledKey] : false}
          mode="dropdown"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            {
              padding: 0,
              paddingLeft: 3,
              color: "#0A233E",
            },
            meta.touched && meta.error ? styles.error : {},
            getTextAlign(locale),
          ]}
        >
        <CustomChildren />
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
