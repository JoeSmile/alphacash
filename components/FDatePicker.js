import { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { useI18n } from "@hooks/useI18n";
import { DatePicker } from '@ant-design/react-native'

const CustomChildren = ({ onPress, extra, ...resetProps }) => {
  return (
    <View >
      <TouchableOpacity activeOpacity={0.32} onPress={onPress}>
        <View style={{
          height: 55,
          paddingLeft: 15,
          justifyContent:'center',
          borderWidth: 1,
          borderColor: '#c0c4d6',
          borderRadius: 10
        }}>
          <Text >{extra}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const FDatePicker = ({label,
  name}) => {
    const context = useFormikContext(name);
    const { i18n } = useI18n();
    const [date, setDate] = useState(
      dayjs(context.values[name] || new Date(), 'DD/MM/YYYY').toDate()
    );
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
      console.log("event, selectedDate", event);
      console.log("selectedDate", selectedDate);
      // setShow(false);
      // context.setFieldValue(name, dayjs(selectedDate).format('YYYY-MM-DD'));
      // setDate(selectedDate)
    };
  
    return (
      <View style={{
        marginBottom: 15,
        height: 80,
      }}>
        <View style={{height: 20, marginBottom:10}}>
          <Text>{i18n.t(label)}</Text>
        </View>
          <DatePicker
            style={{
              borderWidth: 0
            }}
            value={date}
            mode="date"
            defaultDate={date}
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date()}
            onChange={onChange}
            format="YYYY-MM-DD"
          >
            <CustomChildren />
          </DatePicker>
      </View>
    );
  };