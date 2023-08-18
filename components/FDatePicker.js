import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import { useI18n } from "@hooks/useI18n";
import { DatePicker } from "@ant-design/react-native";

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
          <Text>{extra.split(" ")[0]}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const FDatePicker = ({ label, name }) => {
  const context = useFormikContext(name);
  const { i18n } = useI18n();
  const [date, setDate] = useState(
    dayjs(context.values[name] || new Date(), "YYYY-MM-DD").toDate()
  );
  const onChange = (selectedDate) => {
    context.setFieldValue(
      name,
      dayjs(selectedDate, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    setDate(selectedDate);
  };

  const local = useMemo(
    () => ({
      okText: "OK",
      dismissText: "Dismiss",
      extra: "extra",
      DatePickerLocale: {
        year: "Year",
        month: "Month",
        day: "Day",
        hour: "Hour",
        minute: "Minute",
        am: "AM",
        pm: "PM",
      },
    }),
    []
  );

  return (
    <View
      style={{
        marginBottom: 15,
        height: 80,
      }}
    >
      <View>
        <Text style={styles.label}>{i18n.t(label)}</Text>
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
        format={(value) => dayjs(value, "YYYY-MM-DD").format("MM/DD/YYYY")}
        locale={local}
      >
        <CustomChildren />
      </DatePicker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    lineHeight: 20,
    marginBottom: 8,
    color: "#4F5E6F",
    fontSize: 14,
  },
});
