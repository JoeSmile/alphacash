import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Text, StatusBar, Image } from "react-native";
import { LOAN_STATUS, statusToImg } from "@const";
import { FButton } from "@components/FButton";
import {
  formatNumberToFinancial as fn2f,
  formatAccountToFinancial as fa2f,
} from "@utils";

import Spinner from "react-native-loading-spinner-overlay";
import { useBillDetail } from "@apis/hooks";

/*const item = {
  id: "11111",
  applyAmount: "5000",
  getAmount: "5000",
  loanTerm: "7",
  applyDate: "21/07/2023",
  loanDate: "21/07/2023",
  status: "repaid",
  account: "5000",
  markup: "100",
  dueDate: "28/07/2023",
  lumpSum: "5000",
  latePayFee: "200",
  repaymentDate: "30/07/2023",
};*/

export default function BillDetail({ route }) {
  const { loanId } = route.params;
  const hasRepayBillStatus = [LOAN_STATUS.using, LOAN_STATUS.overdue];
  const hasDueDateBillStatus = [...hasRepayBillStatus, LOAN_STATUS.repaid];

  const { mutate: getBillDetail, data: axiosRes, isLoading } = useBillDetail();
  const detail = axiosRes?.data?.data;

  console.log("bill detail: ", detail);

  useEffect(() => {
    getBillDetail({
      loanId,
      token: "E5kcl3IAR6dLtbozCV6fGJ78jDKZvEtM1689823255956013",
    });
  }, []);

  const renderDetail = useCallback((item) => {
    if (!item) {
      return null;
    }

    function renderAccount() {
      const { type, bankAccount, ewalletAccount } =
        item.disburseAccountInfo || {};
      if (!type) {
        return null;
      }
      return (
        <>
          <View style={[styles.line, { marginBottom: 12 }]} />
          <View>
            <Text style={[styles.title, { marginBottom: 8 }]}>
              Collection Account:
            </Text>
            <Text style={styles.titleValue}>
              {fa2f(type === 1 ? bankAccount : ewalletAccount)}
            </Text>
          </View>
        </>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.infoSection}>
          <Image
            source={statusToImg[item.appStatus]}
            contentFit="cover"
            transition={1000}
            style={styles.imgTag}
          />
          <View>
            <Text style={styles.title}>Loan Amount: </Text>
            <Text style={styles.amount}>{fn2f(item.applyAmount)}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.info}>
            <Text style={styles.title}>Apply Date: </Text>
            <Text style={styles.titleValue}>{item.applyDate}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.info}>
            <Text style={styles.title}>Loan Term: </Text>
            <Text style={styles.titleValue}>{item.loanTerm + " Days"}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.info}>
            <Text style={styles.title}>Get Amount: </Text>
            <Text style={styles.titleValue}>{fn2f(item.getAmount)}</Text>
          </View>
          {renderAccount()}
          {hasDueDateBillStatus.includes(item.appStatus) && !!item.dueDate && (
            <>
              <View style={[styles.line, { marginTop: 16 }]}></View>
              <View style={styles.info}>
                <Text style={styles.title}>Loan Date: </Text>
                <Text style={styles.titleValue}>{item.disburseDate}</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.info}>
                <Text style={styles.title}>Markup: </Text>
                <Text style={styles.titleValue}>
                  {fn2f(item.totalInterest)}
                </Text>
              </View>
              {item.appStatus !== LOAN_STATUS.using &&
                !!parseInt(item.latePayFee) && (
                  <>
                    <View style={styles.line}></View>
                    <View style={styles.info}>
                      <Text style={styles.title}>Late Payment Charges: </Text>
                      <Text style={styles.titleValue}>
                        {fn2f(item.latePayFee)}
                      </Text>
                    </View>
                  </>
                )}
              <View style={styles.line}></View>
              <View style={styles.info}>
                <Text style={styles.title}>Lump Sum Repayment Amount: </Text>
                <Text style={styles.titleValue}>
                  {fn2f(item.currentAmountDue)}
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.info}>
                <Text style={styles.title}>Due Date: </Text>
                <Text style={styles.titleValue}>{item.dueDate}</Text>
              </View>
              {item.repaymentDate && (
                <>
                  <View style={styles.line}></View>
                  <View style={styles.info}>
                    <Text style={styles.title}>Repayment Date: </Text>
                    <Text style={styles.titleValue}>{item.repaymentDate}</Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
        {hasRepayBillStatus.includes(item.appStatus) && (
          <FButton
            style={styles.repayBtn}
            onPress={() => navigation.push("Apply")}
            title="Repay Now"
          />
        )}
      </View>
    );
  }, []);

  return (
    <View>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
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
  title: { color: "#4F5E6F", fontSize: 14, lineHeight: 20 },
  imgTag: {
    width: 102,
    height: 73,
    position: "absolute",
    right: 0,
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
    marginHorizontal: 24,
  },
});
