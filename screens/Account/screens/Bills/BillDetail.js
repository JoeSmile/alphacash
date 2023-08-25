import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, Image } from "react-native";
import { LOAN_STATUS, getStatusImgByLocale } from "@const";
import { FButton } from "@components/FButton";
import {
  formatNumberToFinancial as fn2f,
  formatAccountToFinancial as fa2f,
} from "@utils";
import { useI18n } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";

import Spinner from "react-native-loading-spinner-overlay";
import { useBillDetail } from "@apis/hooks";
import { doTrack } from "../../../../utils/dataTrack";

export default function BillDetail({ route }) {
  const { loanId } = route.params;
  const hasRepayBillStatus = [LOAN_STATUS.using, LOAN_STATUS.overdue];
  const hasDueDateBillStatus = [...hasRepayBillStatus, LOAN_STATUS.repaid];
  const { i18n, locale } = useI18n();
  const navigation = useNavigation();

  const { mutate: getBillDetail, data: axiosRes, isLoading } = useBillDetail();
  const detail = axiosRes?.data?.data;

  useEffect(() => {
    getBillDetail({
      loanId,
    });
  }, [loanId]);

  const renderDetail = useCallback((item) => {
    if (!item) {
      return null;
    }

    function renderAccount() {
      const { type, bankAccount, ewalletAccount } =
        item.disburseAccountInfo || {};
      //if (!type) {
      //  return null;
      //}
      return (
        <>
          <View style={[styles.line, { marginBottom: 12 }]} />
          <View>
            <Text style={[styles.title, { marginBottom: 8 }]}>
              {`${i18n.t("Collection Account")}:`}
            </Text>
            <Text style={styles.titleValue}>
              {fa2f(type === 1 ? bankAccount : ewalletAccount)}
            </Text>
          </View>
        </>
      );
    }
    console.log("locale=======", locale);
    return (
      <View style={styles.container}>
        <View style={styles.infoSection}>
          <Image
            source={getStatusImgByLocale(item.appStatus, locale)}
            contentFit="cover"
            transition={1000}
            style={[styles.imgTag, locale == "en" ? { right: 0 } : { left: 0 }]}
          />
          <View>
            <Text style={styles.title}>{`${i18n.t("Loan Amount")}: `}</Text>
            <Text style={styles.amount}>{fn2f(item.applyAmount)}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.info}>
            <Text style={styles.title}>{`${i18n.t("Apply Date")}: `}</Text>
            <Text style={styles.titleValue}>{item.applyDate}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.info}>
            <Text style={styles.title}>{`${i18n.t("LoanTerm")}: `} </Text>
            <Text style={styles.titleValue}>
              {item.loanTerm} {i18n.t("Days")}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.info}>
            <Text style={styles.title}>{`${i18n.t("DisburseAmount")}: `} </Text>
            <Text style={styles.titleValue}>{fn2f(item.getAmount)}</Text>
          </View>
          {renderAccount()}
          {hasDueDateBillStatus.includes(item.appStatus) && !!item.dueDate && (
            <>
              <View style={[styles.line, { marginTop: 16 }]}></View>
              <View style={styles.info}>
                <Text style={styles.title}>{`${i18n.t("Loan Date")}: `} </Text>
                <Text style={styles.titleValue}>{item.disburseDate}</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.info}>
                <Text style={styles.title}>{`${i18n.t("Markup")}: `}</Text>
                <Text style={styles.titleValue}>
                  {fn2f(item.totalInterest)}
                </Text>
              </View>
              {item.appStatus !== LOAN_STATUS.using &&
                !!parseInt(item.latePayFee) && (
                  <>
                    <View style={styles.line}></View>
                    <View style={styles.info}>
                      <Text style={styles.title}>
                        {`${i18n.t("Late Payment Charges")}: `}
                      </Text>
                      <Text style={styles.titleValue}>
                        {fn2f(item.latePayFee)}
                      </Text>
                    </View>
                  </>
                )}
              <View style={styles.line}></View>
              <View style={styles.info}>
                <Text style={styles.title}>{`${i18n.t(
                  "Lump Sum Repayment Amount"
                )}: `}</Text>
                <Text style={styles.titleValue}>
                  {fn2f(item.currentAmountDue)}
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.info}>
                <Text style={styles.title}>{`${i18n.t("Due Date")}: `} </Text>
                <Text style={styles.titleValue}>{item.dueDate}</Text>
              </View>
              {item.paymentDate && (
                <>
                  <View style={styles.line}></View>
                  <View style={styles.info}>
                    <Text style={styles.title}>
                      {`${i18n.t("Repayment Date")}: `}
                    </Text>
                    <Text style={styles.titleValue}>{item.paymentDate}</Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
        {hasRepayBillStatus.includes(item.appStatus) && (
          <FButton
            style={styles.repayBtn}
            onPress={() => {
              doTrack("pk24", 1);
              navigation.push("RepayList");
              //navigation.push("Apply");
            }}
            title="RepayNow"
          />
        )}
      </View>
    );
  }, []);

  return (
    <View>
      <Spinner
        visible={isLoading}
        textContent={i18n.t("Loading")}
        textStyle={{ color: "#FFF" }}
      />
      {renderDetail(detail)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 15,
    marginTop: 16,
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 15,
  },
  title: { textAlign: "left", color: "#4F5E6F", fontSize: 14, lineHeight: 20 },
  imgTag: {
    width: 102,
    height: 73,
    position: "absolute",
    top: 0,
  },
  amount: {
    color: "#0A233E",
    fontSize: 28,
    marginTop: 8,
    lineHeight: 38,
  },
  line: {
    backgroundColor: "#F4F5F7",
    height: 0.5,
    marginVertical: 18,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleValue: {
    color: "#0A233E",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 20,
  },
  repayBtn: {
    backgroundColor: "#0825B8",
    marginTop: 32,
    marginBottom: 25,
    //marginHorizontal: 24,
  },
});
