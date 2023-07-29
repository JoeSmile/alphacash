import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import * as Calendar from "expo-calendar";
import { Toast } from "@ant-design/react-native";
import FModal from "@components/FModal";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n, LocaleTypes } from "@hooks/useI18n";

export const MODAL_TYPE = {
  RATE: "RATE",
  REPAY_TIP: "REPAY_TIP",
};

function HomeModals({ showModal }) {
  const { i18n } = useI18n();

  const [isRatePoped, isRepayReminderOn, setRatePoped, setReminderOn] =
    useSystemStore((s) => [
      s.isRatePoped,
      s.isRepayReminderOn,
      s.setRatePoped,
      s.setRepayReminderOn,
    ]);

  let initModalType, initVisible;
  if (showModal) {
    if (!isRatePoped) {
      initModalType = MODAL_TYPE.RATE;
      initVisible = true;
    } else {
      initModalType = MODAL_TYPE.REPAY_TIP;
      initVisible = !isRepayReminderOn;
    }
  } /* else {
    // TODO 这个else是自测用的，后面要删掉
    initModalType = isRatePoped ? MODAL_TYPE.REPAY_TIP : MODAL_TYPE.RATE;
    initVisible = true;
  }*/

  const [modalType, setModalType] = useState(initModalType);
  const [modalVisible, setModalVisible] = useState(!!initVisible);

  const renderModalHeader = useCallback(() => {
    if (!modalType) {
      return null;
    }

    if (modalType === MODAL_TYPE.REPAY_TIP) {
      return <Text style={styles.title}>{i18n.t('Repayment Tips')}</Text>;
    } else {
      return (
        <>
          <Image
            source={require("@assets/applyLoan/pop_up_score_img.png")}
            style={styles.scoreImg}
          />
          <Text style={styles.title}>{i18n.t('RateUs')}</Text>
        </>
      );
    }
  }, [modalType]);

  const renderModalBody = useCallback(() => {
    if (!modalType) {
      return null;
    }

    if (modalType === MODAL_TYPE.REPAY_TIP) {
      return (
        <>
          <View>
            <Text style={styles.tips}>
              {i18n.t('RepaymentWords')}
              {/* <Text style={styles.strong}>
                {" "}
                [the day before the due date and the day]{" "}
              </Text>
              and increase the amount. */}
            </Text>
          </View>
          <View style={styles.note}>
            <Text style={styles.noteText}>
            {i18n.t('NoteSettings')}
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <Text style={styles.tips}>
         {i18n.t('GoodReview')}
        </Text>
      );
    }
  }, [modalType]);

  const renderModalFooter = useCallback(() => {
    if (!modalType) {
      return null;
    }

    if (modalType === MODAL_TYPE.REPAY_TIP) {
      return (
        <>
          <Pressable
            style={[styles.button, styles.buttonRefuse]}
            onPress={() => {
              setModalVisible(false);
            }}
          >
         
            <Text style={styles.btnText}>{i18n.t('NoOpen')}</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={openCalandar}
          >
            <Text style={styles.btnText}>{i18n.t('OpenNow')}</Text>
          </Pressable>
        </>
      );
    } else {
      return (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setRatePoped();
            setModalType(MODAL_TYPE.REPAY_TIP);
            // TODO, 跳到APP商店评分
          }}
        >
          <Text style={styles.btnText}>{i18n.t('I Know')}</Text>
        </Pressable>
      );
    }
  }, [modalType]);

  const openCalandar = useCallback(async () => {
    setReminderOn(true);
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Toast.info({
        content:
          "Request Calender Permission Failed! Please Setting you Device.",
        duration: 3,
      });
      setModalVisible(false);
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
      Toast.info({
        content: "Create Calender Failed! You can do it youself.",
        duration: 3,
      });
    } else {
      const eventID = await Calendar.createEventAsync(calendarID, {
        title: "time to repay",
        startDate: new Date("2023-07-25 12:30:00"),
        endDate: new Date("2023-07-25 19:30:00"),
      });
      if (!eventID) {
        Toast.info({
          content: "Create Calender Failed! You can do it youself.",
          duration: 3,
        });
      }

      setModalVisible(false);
      return;
    }
  }, []);

  return (
    <FModal
      isOpen={modalVisible}
      displayClose={modalType === MODAL_TYPE.RATE}
      onCloseClick={() => {
        setRatePoped();
        setModalType(MODAL_TYPE.REPAY_TIP);
      }}
      header={renderModalHeader()}
      body={renderModalBody()}
      footer={renderModalFooter()}
    />
  );
}

export default HomeModals;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 22,
    color: "#0A233E",
    fontWeight: "bold",
    textAlign: "center",
  },
  tips: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4F5E6F",
  },
  strong: {
    color: "#0A233E",
    fontWeight: "bold",
  },
  note: {
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 5,
  },
  noteText: {
    color: "#8899AC",
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    borderRadius: 3,
    padding: 12,
    elevation: 2,
    flex: 1,
  },
  buttonOpen: {
    backgroundColor: "#0825B8",
  },
  buttonRefuse: {
    backgroundColor: "#C0C4D6",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  scoreImg: { width: 180, height: 80, marginBottom: 24 },
});
