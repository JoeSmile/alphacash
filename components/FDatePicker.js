import { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import { useI18n } from "@hooks/useI18n";
import { DatePicker } from "@ant-design/react-native";
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import { getWritingDirectionStyle, getPaddingRightOrLeft } from '@styles';

const CustomChildren = ({ onPress, extra, ...resetProps }) => {
  const { i18n, locale } = useI18n();
  return (
    <View>
      <TouchableOpacity activeOpacity={0.32} onPress={onPress}>
        <View
          style={[{
            height: 55,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#c0c4d6",
            borderRadius: 10,
          }, getPaddingRightOrLeft(locale, 0, 15)]}
        >
          <Text style={getWritingDirectionStyle(locale)}>{extra.split(' ')[0]}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const FDatePicker = ({ label, name }) => {
  const context = useFormikContext(name);
  const { i18n, locale } = useI18n();
  const [date, setDate] = useState(
    dayjs(context.values[name] || new Date(), "YYYY-MM-DD").toDate()
  );
  const onChange = (selectedDate) => {
    context.setFieldValue(name, dayjs(selectedDate, "YYYY-MM-DD").format("YYYY-MM-DD"));
    setDate(selectedDate);
  };

  return (
    <View
      style={[{
        marginBottom: 15,
        height: 80,
      }, getWritingDirectionStyle(locale)]}
    >
      <View style={{ height: 20, marginBottom: 10 }}>
        <Text style={[{textIndent:20}, getWritingDirectionStyle(locale)]}>{i18n.t(label)}</Text>
      </View>
      <DatePicker
        style={[{
          borderWidth: 0,
        }, getWritingDirectionStyle(locale)]}
        value={date}
        mode="date"
        defaultDate={date}
        minDate={new Date(1950, 0, 0)}
        maxDate={new Date()}
        onChange={onChange}
        format={(value) => dayjs(value, "YYYY-MM-DD").format("MM/DD/YYYY")}
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
