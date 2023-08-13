import { Image, StyleSheet } from "react-native";
import * as Device from "expo-device";
import { Text, View } from "../../components/Themed";
import { useI18n } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";
import { FButton } from "@components/FButton";
import { useUserQuota } from "@store";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSystemStore } from "@store/useSystemStore";
import { useGetUserFormStatus } from "@apis";
import { doTrack } from "@utils/dataTrack";

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
  const { i18n } = useI18n();

  if (!bill) return <></>;
  return (
    <View
      style={{
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
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
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#4F5E6F",
            fontSize: 15,
          }}
        >
          {i18n.t("Apply Date")}
        </Text>
        <Text
          style={{
            color: "#0A233E",
            fontSize: 15,
          }}
        >
          {bill.applyDate}
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
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    getUserFormStatus();
  }, []);

  useEffect(() => {
    if (data?.data?.error_code == 1) {
      const status = data?.data?.data || {};
      setIsFormCompleted(
        status.isCompletedPersonal &&
          status.isCompletedWork &&
          status.isCompletedContact &&
          status.isCompletedIdentity
      );
    }
  }, [data]);

  const errorMsg = useMemo(() => {
    console.log(
      "Sun >>> isModifyFaceImage = " +
        cashLoan.isModifyFaceImage +
        "isModifyInfo = " +
        cashLoan.isModifyInfo
    );
    if (cashLoan.isModifyFaceImage) {
      //审核驳回 - 是否需要重传人脸识别照
      return i18n.t("FacePhotoErrorMessage");
    } else if (cashLoan.isModifyInfo) {
      //审核驳回 - 是否需要重传照片
      return i18n.t("AccountErrorMessage");
    } else if (hasBill && bill.appStatus == 202) {
      return i18n.t("AccountErrorMessage");
    } else {
      return "";
    }
  }, [cashLoan]);

  useEffect(() => {
    setHasError(cashLoan.isModifyInfo || cashLoan.isModifyFaceImage);
  }, [cashLoan]);

  const clickGetLoan = useCallback(() => {
    if (isLogin) {
      if (isFormCompleted) {
        const apiLevel = Device.platformApiLevel || 1;
        const applist = ExpoApplist.getApps(apiLevel).filter(
          (app) => !app.isSystemApp
        );
        console.log("applist: ", JSON.stringify(applist));
        // 拿到信息后，需要传给后端
        doTrack("pk22", 1);
        navigation.push("Apply");
      } else {
        navigation.push("Credentials");
      }
    } else {
      navigation.push("Login", {
        targetScreen: "Credentials",
        needFormCompleted: true,
      });
    }
  }, [isLogin, isFormCompleted]);

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
              title="EditNow"
              onPress={() => {
                if (hasBill && bill.appStatus == 202) {
                  navigation.push("MyCards", {
                    isUpdateWallet: true,
                    loanId: bill.loanId,
                  });
                } else if (cashLoan.isModifyFaceImage) {
                  navigation.push("FaceDetectionScreen", { isUpdate: true });
                } else if (cashLoan.isModifyInfo) {
                  navigation.push("Certificate", { isUpdate: true });
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
            {
              displayRepayNowButton.includes(bill.appStatus) && <FButton
              title="RepayNow"
              onPress={() => {
                doTrack("pk36", 1);
                navigation.push("RepayList", { bill: bill });
              }}
              style={{
                marginBottom: 12,
              }}
            />}
            {
              displayDetailButton.includes(bill.appStatus) && <FButton
              title="ViewDetails"
              onPress={() => {
                doTrack("pk27", 1);
                navigation.push("BillDetail", { loanId: bill.loanId })
              }
               
              }
              style={{
                marginBottom: 10,
              }}
            />
            }
            
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
});
