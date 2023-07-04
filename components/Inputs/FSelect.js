import { useField, Form, FormikProps, Formik } from 'formik';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FDatePicker } from '@components/FDatePicker';
import { Picker } from '@react-native-picker/picker';

const defaultOptions = [{ label: '男', value: '1' }, { label: '女', value: '2' }]

export function FSelect({
  label,
  options = defaultOptions,
  containerStyle = {},
  labelKey = '',
  valueKey = '',
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  return <View style={{
    flex: '1',
    marginBottom: 15,
    ...containerStyle,
  }}>
    <Text style={styles.label}>{label}</Text>
    <Picker
      enabled={true}
      mode="dropdown"
      onValueChange={field.onChange('gender')}
      selectedValue={field.value.gender}
      style={{
        height: 50,
        borderRadius: 10,
        backgroundColor: 'white'
      }}
    >
      {options.map((item, index) =>
        <Picker.Item
          label={labelKey ? item[labelKey] : item.label}
          value={valueKey ? item[valueKey] : item.value}
          key={`${item.value}_${index}`}
        />)}
    </Picker>
    {meta.touched && meta.error ? (
      <Text className="error">{meta.error}</Text>
    ) : null}
  </View>
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5
  },
});