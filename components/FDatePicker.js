import { useState } from "react";
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import dayjs from 'dayjs';

export const FDatePicker = ({label,
  name}) => {
    const context = useFormikContext(name);

    const [date, setDate] = useState(
      dayjs(context.values[name] || new Date(), 'DD/MM/YYYY').toDate()
    );
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
      setShow(false);
      context.setFieldValue(name, dayjs(selectedDate).format('DD/MM/YYYY'));
      setDate(selectedDate)
    };
  
    return (
      <View style={{
        marginBottom: 15,
        height: 80,
      }}>
        <View style={{height: 20, marginBottom:10}}>
          <Text>{label}</Text>
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
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            onChange={onChange}
          />
        )}
      </View>
    );
  };