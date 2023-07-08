import { View, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';

const defaultOptions = [{ label: '男', value: '1' }, { label: '女', value: '2' }]

export function FSelect({
  label,
  name,
  options = defaultOptions,
  containerStyle = {},
  labelKey = '',
  valueKey = '',
  ...props
}) {
  const context = useFormikContext(name);
  const meta = context.getFieldMeta(name);
  return <View style={{
    marginBottom: 15,
    height: 80,
    ...containerStyle,
  }}>
    <View style={{height: 20, marginBottom:10}}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={{
      borderRadius: 10,
      borderColor: '#C0C4D6',
      justifyContent: 'center',
      borderWidth: 1,
      height: 55,
    }}>
      <Picker
        enabled={true}
        mode="dropdown"
        onValueChange={(v) => {
          context.setFieldValue(name, v);
        }}
        selectedValue={context.values[name]}
        style={[{
          flex:1,
          padding: 0,
          paddingVertical: 0
        }, meta.touched && meta.error ? styles.error: {}]}
      >
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
  },
  error: {
    color: '#E53F31'
  }
});