import { ScrollView, StyleSheet, BackHandler } from "react-native";
import { View } from "../../components/Themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useCallback, useEffect, useState, useRef } from "react";
import * as Calendar from "expo-calendar";
import { Toast } from "@ant-design/react-native";

import { LOAN_STATUS } from "@const";
import { useSystemStore, useUserQuota } from "@store";
import { useGetUserQuota } from "@apis/hooks";
import { getAsyncParams } from "@apis/commonParameter/common";
import { useI18n } from "@hooks/useI18n";

import { CompanyIntro } from "./CompanyIntro";
import { Quota } from "./Quota";
import { Advantage } from "./Advantage";
import { AntiFraudTips } from "./AntiFraudTips";
import { OnlineService } from "./OnlineService";
import HomeModals, { MODAL_TYPE } from "./HomeModals";
import { useIsFocused } from "@react-navigation/native";
import { doTrack } from "../../utils/dataTrack";

export default function Homepage({ route, navigation }) {
  const { i18n } = useI18n();
  const { showModal = false } = route?.params || {};

  const { mutate: getUserQuota, data: axiosRes } = useGetUserQuota();
  const isRepayReminderOn = useSystemStore((s) => s.isRepayReminderOn);
  const [cashLoan, setCashLoan, loanIds, setLoanIdInTips] = useUserQuota(
    (s) => [s.cashLoan, s.setCashLoan, s.loanIdInTips, s.setLoanIdInTips]
  );

  const [modalVisible, setVisible] = useState(false);
  const [modalType, setType] = useState(MODAL_TYPE.RATE);

  const isFocused = useIsFocused();
  // const [lastBackPressed, setLastBackPressed] = useState();
  const lastBackPressed = useRef();
  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  useEffect(() => {
    //setCalendar("01/09/2023");
    isFocused && getUserQuota();
  }, [isFocused]);

  const handleBackPress = useCallback(() => {
    if (navigation.isFocused()) {
      if (
        lastBackPressed.current &&
        lastBackPressed.current + 2000 >= Date.now()
      ) {
        BackHandler.exitApp();
        return true;
      }
      lastBackPressed.current = Date.now();
      Toast.info({
        content: "Press again exit APP",
        duration: 2,
      });
      return true;
    }
  }, []);

  useEffect(() => {
    getAsyncParams(); // 取异步公共参数，包括位置信息，第一次安装进来会有位置授权弹框
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress");
    };
  }, []);

  useEffect(() => {
    const cl = axiosRes?.data?.data?.cashLoan;
    //console.log("cashloan: ", cl);
    if (cl && JSON.stringify(cashLoan) !== JSON.stringify(cl)) {
      setCashLoan(cl);
      if (!cl.isEligible) {
        setVisible(true);
        setType(MODAL_TYPE.ELIGIBLE);
        return;
      }

      if (cl.bill?.appStatus === LOAN_STATUS.using) {
        doTrack("pk33", 1);
        if (!loanIds.includes(cl.bill.loanId)) {
          isRepayReminderOn ? setCalendar(cl.bill?.dueDate) : setVisible(true);
          setLoanIdInTips(cl.bill.loanId);
        }
      }
    }
  }, [axiosRes]);

  const setCalendar = useCallback(async (dueDate) => {
    if (!dueDate) {
      return;
    }

    const [d, m, y] = dueDate.split("/");
    const formattedDueDate = [y, m, d].join("-");
    const dayBeforeDue =
      new Date(formattedDueDate + " 00:00:00").getTime() -
      11.5 * 60 * 60 * 1000;

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      //Toast.info({
      //  content:
      //    "Request Calender Permission Failed! Please Setting you Device.",
      //  duration: 3,
      //});

      return;
    }

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
      //Toast.info({
      //  content: "Create Calender Failed! You can do it youself.",
      //  duration: 3,
      //});
      return;
    }
    const eventID1 = await Calendar.createEventAsync(calendarID, {
      title: i18n.t("Repayment Tips"),
      notes: i18n.t(
        "The loan you applied for is about to expire, please repay it in time!"
      ),
      startDate: new Date(dayBeforeDue),
      endDate: new Date(dayBeforeDue + 30 * 60 * 1000),
      alarms: [
        {
          method: Calendar.AlarmMethod.ALARM,
          relativeOffset: 0,
        },
      ],
    });
    const eventID2 = await Calendar.createEventAsync(calendarID, {
      title: i18n.t("Repayment Tips"),
      notes: i18n.t(
        "The loan you applied for is due, and you must repay it in time today to avoid overdue!"
      ),
      startDate: new Date(formattedDueDate + " 18:30:00"),
      endDate: new Date(formattedDueDate + " 19:00:00"),
      alarms: [
        {
          method: Calendar.AlarmMethod.ALARM,
          relativeOffset: 0,
        },
      ],
    });
    //if (!eventID1 || !eventID2) {
    //  Toast.info({
    //    content: "Create Calender Failed! You can do it youself.",
    //    duration: 3,
    //  });
    //}
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner} />
      <CompanyIntro />
      <Quota />
      <Advantage />
      <AntiFraudTips />
      <OnlineService />
      <HomeModals showModal={modalVisible} type={modalType} />
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
