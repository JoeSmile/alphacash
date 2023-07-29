import { useState } from "react";
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { useI18n } from "@hooks/useI18n";
import { DatePicker, List } from '@ant-design/react-native'

export const FDatePicker = ({label,
  name}) => {
    const context = useFormikContext(name);
    const { i18n } = useI18n();

    const [date, setDate] = useState(
      dayjs(context.values[name] || new Date(), 'DD/MM/YYYY').toDate()
    );
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
      setShow(false);
      context.setFieldValue(name, dayjs(selectedDate).format('YYYY-MM-DD'));
      setDate(selectedDate)
    };
  
    return (
      <View style={{
        marginBottom: 15,
        height: 80,
      }}>
        <View style={{height: 20, marginBottom:10}}>
          <Text>{i18n.t(label)}</Text>
        </View>
        <Pressable onPress={()=> setShow(true)} >
          <Text style={{
            borderRadius: 10,
            borderColor: '#C0C4D6',
            justifyContent: 'center',
            borderWidth: 1,
            height: 55,
            lineHeight: 55,
            paddingHorizontal: 10,
            fontSize: 14
          }}>{date.toLocaleDateString()}</Text>
        </Pressable>
        {show && (
          <List>
          <DatePicker
            value={this.state.value}
            mode="date"
            defaultDate={new Date()}
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date(2026, 11, 3)}
            onChange={onChange}
            format="YYYY-MM-DD">
            <List.Item arrow="horizontal">Select Date</List.Item>
          </DatePicker>
        </List>
        )}
      </View>
    );
  };