import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
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
import { getWritingDirectionStyle, getMarginRightOrLeft, getRTLView, getTextAlign } from "@styles";

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
          <View style={[getRTLView(locale)]}>
            <Text style={[styles.title, { marginBottom: 8 }]}>
              {`${i18n.t("Collection Account")}:`}
            </Text>
            <Text style={[[styles.titleValue, getTextAlign(locale, true)], getWritingDirectionStyle(locale)]}>
              {fa2f(type === 1 ? bankAccount : ewalletAccount)}
            </Text>
          </View>
        </>
      );
    }
    console.log("locale=======", locale);
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.infoSection}>
            <Image
              source={getStatusImgByLocale(item.appStatus, locale)}
              contentFit="cover"
              transition={1000}
              style={[
                styles.imgTag,
                locale == "en" ? { right: 0 } : { left: 0 },
              ]}
            />
            <View style={[getTextAlign(locale)]}>
              <Text
                style={[styles.title, getWritingDirectionStyle(locale)]}
              >{`${i18n.t("Loan Amount")}: `}</Text>
              <Text style={[styles.amount, getWritingDirectionStyle(locale)]}>
                {fn2f(item.applyAmount)}
              </Text>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.info, getRTLView(locale)]}>
              <Text style={styles.title}>{`${i18n.t("Apply Date")}: `}</Text>
              <Text style={[styles.titleValue, getTextAlign(locale, true)]}>{item.applyDate}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.info, getRTLView(locale)]}>
              <Text style={styles.title}>{`${i18n.t("LoanTerm")}: `} </Text>
              <Text style={[styles.titleValue, getTextAlign(locale, true)]}>
                {item.loanTerm} {i18n.t("Days")}
              </Text>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.info, getRTLView(locale)]}>
              <Text style={styles.title}>
                {`${i18n.t("DisburseAmount")}: `}
              </Text>
              <Text style={[styles.titleValue, getTextAlign(locale, true)]}>{fn2f(item.getAmount)}</Text>
            </View>
            {renderAccount()}
            {hasDueDateBillStatus.includes(item.appStatus) &&
              !!item.dueDate && (
                <>
                  <View style={[styles.line, { marginTop: 16 }]}></View>
                  <View style={[styles.info, getRTLView(locale)]}>
                    <Text style={styles.title}>
                      {`${i18n.t("Loan Date")}: `}
                    </Text>
                    <Text style={[styles.titleValue, getTextAlign(locale, true)]}>{item.disburseDate}</Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={[styles.info, getRTLView(locale)]}>
                    <Text style={styles.title}>{`${i18n.t("Markup")}: `}</Text>
                    <Text style={[styles.titleValue, getTextAlign(locale, true)]}>
                      {fn2f(item.totalInterest)}
                    </Text>
                  </View>
                  {item.appStatus !== LOAN_STATUS.using &&
                    !!parseInt(item.latePayFee) && (
                      <>
                        <View style={styles.line}></View>
                        <View
                          style={[
                            styles.info,
                            getWritingDirectionStyle(locale),
                          ]}
                        >
                          <Text style={styles.title}>
                            {`${i18n.t("Late Payment Charges")}: `}
                          </Text>
                          <Text style={[styles.titleValue, getTextAlign(locale, true)]}>
                            {fn2f(item.latePayFee)}
                          </Text>
                        </View>
                      </>
                    )}
                  <View style={styles.line}></View>
                  <View style={[styles.info, getRTLView(locale)]}>
                    <Text style={styles.title}>{`${i18n.t(
                      "Lump Sum Repayment Amount"
                    )}: `}</Text>
                    <Text style={[styles.titleValue, getTextAlign(locale, true)]}>
                      {fn2f(item.currentAmountDue)}
                    </Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={[styles.info, getRTLView(locale)]}>
                    <Text style={styles.title}>
                      {`${i18n.t("Due Date")}: `}
                    </Text>
                    <Text style={[styles.titleValue, getTextAlign(locale, true)]}>{item.dueDate}</Text>
                  </View>
                  {item.paymentDate && (
                    <>
                      <View style={styles.line}></View>
                      <View
                        style={[styles.info, getRTLView(locale)]}
                      >
                        <Text style={styles.title}>
                          {`${i18n.t("Repayment Date")}: `}
                        </Text>
                        <Text style={[styles.titleValue, getTextAlign(locale, true)]}>
                          {item.paymentDate}
                        </Text>
                      </View>
                    </>
                  )}
                </>
              )}
          </View>
        </ScrollView>
        {hasRepayBillStatus.includes(item.appStatus) && (
          <View style={styles.repayBtnWrap}>
            <FButton
              style={styles.repayBtn}
              onPress={() => {
                doTrack("pk24", 1);
                navigation.push("RepayList");
                // navigation.push("Apply");
              }}
              title="RepayNow"
            />
          </View>
        )}
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={i18n.t("Loading")}
        textStyle={{ color: "#FFF" }}
      />
      {renderDetail(detail)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  title: { color: "#4F5E6F", fontSize: 14, lineHeight: 20 },
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
    flex: 1
  },
  repayBtnWrap: {
    padding: 15,
    backgroundColor: "white",
  },
  repayBtn: {
    backgroundColor: "#0825B8",
  },
});
