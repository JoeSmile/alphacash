import { ScrollView, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useCallback, useEffect, useState } from "react";

import { LOAN_STATUS } from "@const";
import { useSystemStore, useUserQuota } from "@store";
import { useGetUserQuota } from "@apis/hooks";

import { CompanyIntro } from "./CompanyIntro";
import { Quota } from "./Quota";
import { Advantage } from "./Advantage";
import { AntiFraudTips } from "./AntiFraudTips";
import { OnlineService } from "./OnlineService";
import HomeModals from "./HomeModals";
import { useIsFocused } from '@react-navigation/native';


export default function Homepage({ route }) {
  const { showModal = false } = route?.params || {};

  const { mutate: getUserQuota, data: axiosRes } = useGetUserQuota();
  const isRepayReminderOn = useSystemStore((s) => s.isRepayReminderOn);
  const [cashLoan, setCashLoan] = useUserQuota((s) => [
    s.cashLoan,
    s.setCashLoan,
  ]);

  const [modalVisible, setVisible] = useState(false);
  const isFocused = useIsFocused();


  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  useEffect(() => {
    getUserQuota();
  }, [isFocused]);

  useEffect(() => {
    const cl = axiosRes?.data?.data?.cashLoan;
    console.log("cashloan: ", cl);
    if (cl && JSON.stringify(cashLoan) !== JSON.stringify(cl)) {
      setCashLoan(cl);
      if (cl.bill?.appStatus === LOAN_STATUS.using) {
        isRepayReminderOn ? setCalendar(cl.bill?.dueDate) : setVisible(true);
      }
    }
  }, [axiosRes]);

  const setCalendar = useCallback(async (dueDate) => {
    if (!dueDate) {
      return;
    }

    const dayBeforeDue = new Date(dueDate).getTime() - 11.5 * 60 * 60 * 1000;

    // 拿之前创建的，或者创建新的calendar
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const expoCalendar = calendars.find((ca) => ca.title === "Expo Calendar");
    let calendarID;
    if (expoCalendar) {
      calendarID = expoCalendar.id;
    } else {
      let defaultCalendarSource = {
        isLocalAccount: true,
        name: "Expo Calendar",
      };
      if (Platform.OS === "ios") {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        defaultCalendarSource = defaultCalendar.source;
      }
      calendarID = await Calendar.createCalendarAsync({
        title: "Expo Calendar",
        color: "blue",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "repayment tip:",
        allowsModifications: false,
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
    }

    if (!calendarID) {
      Toast.info({
        content: "Create Calender Failed! You can do it youself.",
        duration: 3,
      });
    } else {
      const eventID = await Calendar.createEventAsync(calendarID, {
        title: "time to repay",
        startDate: new Date(dayBeforeDue),
        endDate: new Date(dayBeforeDue + 30 * 60 * 1000),
      });
      if (!eventID) {
        Toast.info({
          content: "Create Calender Failed! You can do it youself.",
          duration: 3,
        });
      }
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner} />
      <CompanyIntro />
      <Quota />
      <Advantage />
      <AntiFraudTips />
      <OnlineService />
      <HomeModals showModal={modalVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  banner: {
    top: 0,
    position: "absolute",
    backgroundColor: "#0825B8",
    width: "100%",
    height: 150,
    zIndex: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  test: {
    // fontSize: wp(8),
    fontSize: RFValue(24),
    width: wp(100),
    height: hp(20),
    marginVertical: hp(1),
    textAlign: "center",
  },
});
