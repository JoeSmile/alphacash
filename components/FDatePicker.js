import { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import { useI18n } from "@hooks/useI18n";
import { DatePicker } from "@ant-design/react-native";
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';

const CustomChildren = ({ onPress, extra, ...resetProps }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.32} onPress={onPress}>
        <View
          style={{
            height: 55,
            paddingLeft: 15,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#c0c4d6",
            borderRadius: 10,
          }}
        >
          <Text>{extra.split(' ')[0]}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const FDatePicker = ({ label, name }) => {
  const context = useFormikContext(name);
  const { i18n } = useI18n();
  const [date, setDate] = useState(
    dayjs(context.values[name] || new Date(), "MM/DD/YYYY").toDate()
  );
  const onChange = (selectedDate) => {
    context.setFieldValue(name, selectedDate);
    setDate(selectedDate);
  };

  return (
    <View
      style={{
        marginBottom: 15,
        height: 80,
      }}
    >
      <View style={{ height: 20, marginBottom: 10 }}>
        <Text>{i18n.t(label)}</Text>
      </View>
      <DatePicker
        style={{
          borderWidth: 0,
        }}
        value={date}
        mode="date"
        defaultDate={date}
        minDate={new Date(1950, 0, 0)}
        maxDate={new Date()}
        onChange={onChange}
        format="MM/DD/YYYY"
        locale={{
          okText: 'OK',
          dismissText:'Dismiss',
          extra:'extra',
          DatePickerLocale: {
            year:'Year',
            month:'Month',
            day:'Day',
            hour:'Hour',
            minute:'Minute',
            am:'AM',
            pm:'PM',
            }
        }}
      >
        <CustomChildren />
      </DatePicker>
    </View>
  );
};
