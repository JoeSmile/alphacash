import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import * as Linking from "expo-linking";
import * as Calendar from "expo-calendar";
import { Toast } from "@ant-design/react-native";
import FModal from "@components/FModal";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { getTextAlign } from "../../styles";

export const MODAL_TYPE = {
  RATE: "RATE",
  REPAY_TIP: "REPAY_TIP",
  ELIGIBLE: "ELIGIBLE",
};

function HomeModals({ showModal, type }) {
  const { i18n, locale } = useI18n();

  const [isLogin, isRatePoped, isRepayReminderOn, setRatePoped, setReminderOn] =
    useSystemStore((s) => [
      !!s.token,
      s.usersInfo[s.phone]?.isRatePoped ?? false,
      s.usersInfo[s.phone]?.isRepayReminderOn ?? false,
      s.setRatePoped,
      s.setRepayReminderOn,
    ]);

  useEffect(() => {
    let initModalType, initVisible;
    if (!isLogin) {
      return;
    }
    if (showModal) {
      if (type === MODAL_TYPE.ELIGIBLE) {
        initModalType = MODAL_TYPE.ELIGIBLE;
        initVisible = true;
      } else {
        if (!isRatePoped) {
          initModalType = MODAL_TYPE.RATE;
          initVisible = true;
        } else {
          initModalType = MODAL_TYPE.REPAY_TIP;
          initVisible = !isRepayReminderOn;
        }
      }

      setModalType(initModalType);
      setModalVisible(!!initVisible);
    }
  }, [showModal, type]);

  const [modalType, setModalType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const renderModalHeader = useCallback(() => {
    let header;

    switch (modalType) {
      case MODAL_TYPE.REPAY_TIP:
        header = <Text style={styles.title}>{i18n.t("Repayment Tips")}</Text>;
        break;
      case MODAL_TYPE.RATE:
        header = (
          <>
            <Image
              source={require("@assets/applyLoan/pop_up_score_img.png")}
              style={styles.scoreImg}
            />
            <Text style={styles.title}>{i18n.t("RateUs")}</Text>
          </>
        );
        break;
      case MODAL_TYPE.ELIGIBLE:
        header = (
          <>
            <Image
              source={require("@assets/applyLoan/pop_up_ic_apply_qualification.png")}
              style={{ ...styles.scoreImg, width: 80, height: 80 }}
            />
            <Text style={styles.title}>{i18n.t("Apply Qualification")}</Text>
          </>
        );
        break;

      default:
        header = null;
        break;
    }

    return header;
  }, [modalType]);

  const renderModalBody = useCallback(() => {
    let body;

    switch (modalType) {
      case MODAL_TYPE.REPAY_TIP:
        body = (
          <>
            <View>
              <Text style={[styles.tips, getTextAlign(locale)]}>
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
        break;
      case MODAL_TYPE.RATE:
        body = (
          <Text style={[styles.tips, getTextAlign(locale)]}>
            {i18n.t("GoodReview")}
          </Text>
        );
        break;
      case MODAL_TYPE.ELIGIBLE:
        body = (
          <Text style={[styles.tips, getTextAlign(locale)]}>
            {i18n.t("Terribly sorry")}
          </Text>
        );
        break;

      default:
        body = null;
        break;
    }

    return body;
  }, [modalType]);

  const renderModalFooter = useCallback(() => {
    let footer;

    switch (modalType) {
      case MODAL_TYPE.REPAY_TIP:
        footer = (
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
        break;
      case MODAL_TYPE.RATE:
        footer = (
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setRatePoped();
              setModalType(MODAL_TYPE.REPAY_TIP);
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.alphacash.easy.credit.loan.paisa&hl=en-gb&gl=pk"
              );
            }}
          >
            <Text style={styles.btnText}>{i18n.t("RateNow")}</Text>
          </Pressable>
        );
        break;
      case MODAL_TYPE.ELIGIBLE:
        footer = (
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              doTrack("pk7", 1);
              setModalVisible(false);
            }}
          >
            <Text style={styles.btnText}>{i18n.t("I Know")}</Text>
          </Pressable>
        );
        break;

      default:
        footer = null;
        break;
    }

    return footer;
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
  scoreImg: {
    width: 180,
    height: 80,
    marginBottom: 24,
  },
});
