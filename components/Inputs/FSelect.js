import { View, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle, getMarginRightOrLeft, getPaddingRightOrLeft } from '@styles';

// const defaultOptions = [{ label: '男', value: '1' }, { label: '女', value: '2' }]

export function FSelect({
  label,
  name,
  options=[],
  containerStyle = {},
  labelKey = '',
  valueKey = '',
  enabledKey='',
  suffix='',
  ...props
}) {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);
  const { i18n, locale } = useI18n();
  return <View style={[{
    marginBottom: 15,
    height: 80,
    ...containerStyle,
  }, getWritingDirectionStyle(locale)]}>

    <View style={{height: 20, marginBottom:5}}>
      <Text style={[{height: 20, color: '#4F5E6F'}, getWritingDirectionStyle(locale)]}>{i18n.t(label)}{` ${suffix}`}</Text>
    </View>
    <View style={{
      justifyContent: 'center',
      borderColor: '#C0C4D6',
      borderRadius: 10,
      borderWidth: 1,
      height: 55,
    }}>
      <Picker
        enabled={ enabledKey ? !!context.values[enabledKey] : true}
        mode="dropdown"
        onValueChange={(v) => {
          context.setFieldValue(name, v);
        }}
        selectedValue={context.values[name]}
        style={[{
          padding: 0,
          color: '#0A233E',
        }, meta.touched && meta.error ? styles.error: {}, getPaddingRightOrLeft(locale, 0, 15)]}
      >
        {!context.values[name] && <Picker.Item label="Please select an option..." value="" />}
        {options.map((item, index) =>
          <Picker.Item
            label={labelKey ? item[labelKey] : item.label}
            value={valueKey ? item[valueKey] : item.value}
            key={`${item.value}_${index}`}
          />)}
      </Picker>
    </View>
    {meta.touched && meta.error ? (
      <Text className="error" style={{ color: '#E53F31' }}>{meta.error}</Text>
    ) : null}
  </View>
}

const styles = StyleSheet.create({
  label: {
    height: 15,
    color: '#4F5E6F',
  },
  error: {
    color: '#E53F31'
  }
});