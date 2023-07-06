import { useField, Form, FormikProps, Formik } from 'formik';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FDatePicker } from '@components/FDatePicker';
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
    height: 60,
    ...containerStyle,
  }}>
    <View>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Picker
      enabled={true}
      mode="dropdown"
      onValueChange={(v) => {
        context.setFieldValue(name, v);
      }}
      selectedValue={context.values[name]}
      style={[{
        height: 35,
        minHeight: 35,
        borderRadius: 10,
        backgroundColor: 'white'
      }, meta.touched && meta.error ? styles.error: {}]}
    >
      <Picker.Item label=" " value="" /> 
      {options.map((item, index) =>
        <Picker.Item
          label={labelKey ? item[labelKey] : item.label}
          value={valueKey ? item[valueKey] : item.value}
          key={`${item.value}_${index}`}
        />)}
    </Picker>
    {meta.touched && meta.error ? (
      <Text className="error" style={{ color: '#E53F31' }}>{meta.error}</Text>
    ) : null}
  </View>
}

const styles = StyleSheet.create({
  label: {
    height: 15,
    marginBottom: 5
  },
  error: {
    color: '#E53F31'
  }
});