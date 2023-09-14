import { Image, StyleSheet, Pressable } from "react-native";
import * as Device from "expo-device";
import * as ExpoApplist from "expo-applist";
import { Text, View } from "../../components/Themed";
import { useI18n } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";
import { FButton } from "@components/FButton";
import { useUserQuota } from "@store";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSystemStore } from "@store/useSystemStore";
import { useGetUserFormStatus, usePushApplist } from "@apis";
import { doTrack } from "@utils/dataTrack";
import { getAesKey, encryptAES, encryptRSA } from "@utils/rsaCrypto";
import { useIsFocused } from "@react-navigation/native";
import { getRTLView } from "@styles";

// 101-审核中
// 102-已拒绝
// 103-已取消
// 201-打款中
// 202-打款失败
// 301-使用中
// 303-已逾期
// 501-已还款

const displayDetailButton = [101, 201, 202, 301, 303, 501];
const displayRepayNowButton = [301, 303];

function BillBrief({ bill }) {
  const { i18n, locale } = useI18n();

  if (!bill) return <></>;
  return (
    <View
      style={{
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <View
        style={[
          {
            justifyContent: "space-between",
            marginBottom: 10,
          },
          getRTLView(locale),
        ]}
      >
        <Text
          style={{
            color: "#4F5E6F",
            fontSize: 15,
          }}
        >
          {i18n.t("LoanTerm")}
        </Text>
        <Text
          style={{
            color: "#0A233E",
            fontSize: 15,
          }}
        >
          {bill.loanTerm} {i18n.t("Days")}
        </Text>
      </View>
      <View
        style={[
          {
            justifyContent: "space-between",
          },
          getRTLView(locale),
        ]}
      >
        <Text
          style={{
            color: "#4F5E6F",
            fontSize: 15,
          }}
        >
          {[301, 303].includes(bill.appStatus)
            ? i18n.t("Due Date")
            : i18n.t("Apply Date")}
        </Text>
        <Text
          style={{
            color: "#0A233E",
            fontSize: 15,
          }}
        >
          {[301, 303].includes(bill.appStatus) ? bill.dueDate : bill.applyDate}
        </Text>
      </View>
    </View>
  );
}

export function QuotaButtons() {
  const { i18n } = useI18n();
  const navigation = useNavigation();
  const [cashLoan, bill, hasBill] = useUserQuota((s) => [
    s.cashLoan,
    s.bill,
    s.hasBill,
  ]);
  const [hasError, setHasError] = useState(false);
  const isLogin = useSystemStore((s) => !!s.token);
  const { mutate: getUserFormStatus, data } = useGetUserFormStatus();
  const { mutate: pushApplistMutate, data: pushApplistResp } = usePushApplist();
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [targeFormStep, setTargetFormStep] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserFormStatus();
    //pushApplist();
  }, [isFocused]);

  useEffect(() => {
    if (data?.data?.error_code == 1) {
      const status = data?.data?.data || {};
      setIsFormCompleted(
        status.isCompletedPersonal &&
          status.isCompletedWork &&
          status.isCompletedContact &&
          status.isCompletedIdentity
      );
      if (!status.isCompletedPersonal) {
        setTargetFormStep("Personal");
      } else if (!status.isCompletedWork) {
        setTargetFormStep("Job");
      } else if (!status.isCompletedContact) {
        setTargetFormStep("Emergency");
      } else if (!status.isCompletedIdentity) {
        setTargetFormStep("Certificate");
      }
    }
  }, [data]);

  const errorMsg = useMemo(() => {
    if (cashLoan.isModifyFaceImage) {
      //审核驳回 - 是否需要重传人脸识别照
      return i18n.t("FacePhotoErrorMessage");
    } else if (cashLoan.isModifyInfo) {
      //审核驳回 - 是否需要重传照片
      return i18n.t("IDPhotoErrorMessage");
    } else if (hasBill && bill.appStatus == 202) {
      return i18n.t("AccountErrorMessage");
    } else {
      return "";
    }
  }, [cashLoan]);

  useEffect(() => {
    setHasError(
      cashLoan.isModifyInfo ||
        cashLoan.isModifyFaceImage ||
        (hasBill && bill.appStatus == 202)
    );
  }, [cashLoan, hasBill, bill]);

  const pushApplist = useCallback(() => {
    const apiLevel = Device.platformApiLevel || 1;
    let applist = [];

    try {
      applist = ExpoApplist.getApps(apiLevel).filter((app) => !app.isSystemApp);
      console.log("applist: ", JSON.stringify(applist));
    } catch (e) {
      console.log("get applist faile: ", JSON.stringify(e));
    }

    // 拿到信息后，需要传给后端
    //const applist = [
    //  {
    //    packageName: "aa.bb.cc",
    //    firstInstallTime: 1691998080454,
    //    lastUpdateTime: 1691999080454,
    //    appName: "abc",
    //    appType: 1,
    //  },
    //];

    if (applist.length <= 0) {
      return;
    }

    const applistWithType = applist.map((it) => {
      const { isSystemApp, ...appInfo } = it;
      appInfo.appType = 1;

      return appInfo;
    });

    const aesKey = getAesKey(16);
    const pknzgx = encryptAES(JSON.stringify(applistWithType), aesKey);
    const openKey = encryptRSA(aesKey);

    pushApplistMutate({ pknzgx, openKey });
  }, []);

  const clickGetLoan = useCallback(() => {
    if (isLogin) {
      // navigation.push("FaceDetectionScreen");
      pushApplist();
      if (isFormCompleted) {
        doTrack("pk22", 1);
        navigation.push("Apply");
      } else {
        navigation.push(targeFormStep, { fromScreen: "Apply" });
      }
    } else {
      navigation.push("Login", {
        targetScreen: "Apply",
        needFormCompleted: true,
      });
    }
  }, [isLogin, isFormCompleted, targeFormStep]);

  if (hasBill) {
    return (
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        {/* bill brief */}
        <BillBrief bill={bill} />

        {/* need modify some info */}
        {hasError && (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#EF3C34",
                  lineHeight: 20,
                }}
              >
                <Image
                  source={require("@assets/images/home_ic_warn.png")}
                  style={{
                    width: 20,
                    height: 20,
                    //transform: "translateY(4px)",
                    transform: [{ translateY: 4 }],
                  }}
                />
                {"  "}
                {errorMsg}
              </Text>
            </View>

            <FButton
              title={
                cashLoan.isModifyFaceImage ? "Face Recognition Now" : "EditNow"
              }
              onPress={() => {
                if (hasBill && bill.appStatus == 202) {
                  navigation.push("MyCards", {
                    isUpdateWallet: true,
                    loanId: bill.loanId,
                  });
                } else if (cashLoan.isModifyFaceImage) {
                  navigation.push("FaceDetectionScreen", { isModify: true });
                } else if (cashLoan.isModifyInfo) {
                  navigation.push("Certificate", { isModify: true });
                }
              }}
            />
          </View>
        )}
        {!hasError && (
          <View
            style={{
              marginTop: 20,
            }}
          >
            {displayRepayNowButton.includes(bill.appStatus) && (
              <FButton
                title="RepayNow"
                onPress={() => {
                  doTrack("pk36", 1);
                  navigation.push("RepayList", { bill: bill });
                }}
                style={{
                  marginBottom: 12,
                }}
              />
            )}
            {displayDetailButton.includes(bill.appStatus) &&
              (displayRepayNowButton.includes(bill.appStatus) ? (
                <Pressable
                  style={styles.viewDetailBtn}
                  onPress={() => {
                    doTrack("pk27", 1);
                    navigation.push("BillDetail", { loanId: bill.loanId });
                  }}
                >
                  <Text style={styles.text}>{i18n.t("ViewDetails")}</Text>
                </Pressable>
              ) : (
                <FButton
                  title="ViewDetails"
                  onPress={() => {
                    doTrack("pk27", 1);
                    navigation.push("BillDetail", { loanId: bill.loanId });
                  }}
                  style={{
                    marginBottom: 10,
                  }}
                />
              ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FButton
        style={{
          marginRight: 15,
          marginLeft: 15,
        }}
        onPress={clickGetLoan}
        title="GetLoan"
        disabled={!cashLoan.isEligible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingBottom: 15,
    borderRadius: 4,
  },
  viewDetailBtn: {
    paddingVertical: 12,
    borderRadius: 3,
    marginBottom: 10,
    backgroundColor: "#0825B814",
    borderWidth: 1,
    borderColor: "#0825B8",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: "#0825B8",
  },
});
