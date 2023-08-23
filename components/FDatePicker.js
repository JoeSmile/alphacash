import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import { useI18n } from "@hooks/useI18n";
import { DatePicker } from "@ant-design/react-native";
import { getWritingDirectionStyle, getPaddingRightOrLeft } from "@styles";

const CustomChildren = ({ onPress, extra, ...resetProps }) => {
  const { i18n, locale } = useI18n();
  return (
    <View>
      <TouchableOpacity activeOpacity={0.32} onPress={onPress}>
        <View
          style={[
            {
              height: 48,
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#c0c4d6",
              borderRadius: 10,
            },
            getPaddingRightOrLeft(locale, 0, 15),
          ]}
        >
          <Text style={getWritingDirectionStyle(locale)}>
            {extra.split(" ")[0]}
          </Text>
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
  const [focused, setFocused] = useState(false);

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
    <View style={getWritingDirectionStyle(locale)}>
      <View>
        <Text
          style={[
            styles.label,
            getWritingDirectionStyle(locale),
            { color: focused ? "#0825B8" : "#4F5E6F" },
          ]}
        >
          {i18n.t(label)}
        </Text>
      </View>
      <DatePicker
        style={[
          {
            borderWidth: 0,
          },
          getWritingDirectionStyle(locale),
        ]}
        value={date}
        mode="date"
        defaultDate={date}
        minDate={new Date(1950, 0, 0)}
        maxDate={new Date()}
        onChange={onChange}
        format={(value) => dayjs(value, "YYYY-MM-DD").format("MM/DD/YYYY")}
        locale={local}
        onPress={() => setFocused(true)}
        onDismiss={() => setFocused(false)}
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
