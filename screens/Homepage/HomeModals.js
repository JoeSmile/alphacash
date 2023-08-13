import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import * as Calendar from "expo-calendar";
import { Toast } from "@ant-design/react-native";
import FModal from "@components/FModal";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";

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

  useEffect(() => {
    let initModalType, initVisible;
    if (showModal) {
      if (!isRatePoped) {
        initModalType = MODAL_TYPE.RATE;
        initVisible = true;
      } else {
        initModalType = MODAL_TYPE.REPAY_TIP;
        initVisible = !isRepayReminderOn;
      }

      setModalType(initModalType);
      setModalVisible(!!initVisible);
    }
  }, [showModal]);

  const [modalType, setModalType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderModalHeader = useCallback(() => {
    if (!modalType) {
      return null;
    }

    if (modalType === MODAL_TYPE.REPAY_TIP) {
      return <Text style={styles.title}>{i18n.t("Repayment Tips")}</Text>;
    } else {
      return (
        <>
          <Image
            source={require("@assets/applyLoan/pop_up_score_img.png")}
            style={styles.scoreImg}
          />
          <Text style={styles.title}>{i18n.t("RateUs")}</Text>
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
              {i18n.t("RepaymentWords")}
              {/* <Text style={styles.strong}>
                {" "}
                [the day before the due date and the day]{" "}
              </Text>
              and increase the amount. */}
            </Text>
          </View>
          <View style={styles.note}>
            <Text style={styles.noteText}>{i18n.t("NoteSettings")}</Text>
          </View>
        </>
      );
    } else {
      return <Text style={styles.tips}>{i18n.t("GoodReview")}</Text>;
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
            <Text style={styles.btnText}>{i18n.t("NoOpen")}</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={openCalandar}
          >
            <Text style={styles.btnText}>{i18n.t("OpenNow")}</Text>
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
          <Text style={styles.btnText}>{i18n.t("I Know")}</Text>
        </Pressable>
      );
    }
  }, [modalType]);

  const openCalandar = useCallback(async () => {
    setReminderOn(true);
    doTrack("pk6", 1);
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Toast.info({
        content:
          "Request Calender Permission Failed! Please Setting you Device.",
        duration: 3,
      });
    }

    setModalVisible(false);
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
