import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { useCallback, useState } from "react";
import { useI18n } from "@hooks/useI18n";
import { formatNumberToFinancial as fn2f } from "@utils";

const imageDown = require("@assets/applyLoan/loan_ic_arrow_down.png");
const imageUp = require("@assets/applyLoan/loan_ic_arrow_up.png");

export default function LoanDetails({
  optWithDaysConfig,
  daysOption,
  amountIndex,
}) {
  const { i18n } = useI18n();
  const [isChecked, setIsChecked] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const loanData = optWithDaysConfig[daysOption].opt[amountIndex];

  const handleFeePress = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  const showKindTips = useCallback(() => {
    setShowTips(!showTips);
  }, [showTips]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleFeePress} style={styles.listItemStyle}>
        <View style={styles.feeItemStyle}>
          <Text>{i18n.t("Fee")}</Text>
          <Text style={styles.listItemTitle}>{fn2f(loanData.manageFee)}</Text>
        </View>
        <Image
          source={isChecked ? imageUp : imageDown}
          style={styles.imageStyle}
        />
      </Pressable>

      {/* 费用明细 */}
      {isChecked && (
        <View style={styles.feeUnflodStyle}>
          <View style={styles.feeUnflodItemStyle}>
            <Text style={styles.textStyle}>
              {i18n.t("Credit Approval Fee")}
            </Text>
            <Text style={styles.textStyle}>
              {fn2f(loanData.manageFeeDetail.LoanApprovalFee)}
            </Text>
          </View>

          <View style={styles.feeUnflodItemStyle}>
            <Text style={styles.textStyle}>{i18n.t("Service Fee")}</Text>
            <Text style={styles.textStyle}>
              {fn2f(loanData.manageFeeDetail.serviceFee)}
            </Text>
          </View>

          <View style={styles.feeUnflodItemStyle}>
            <Text style={styles.textStyle}>{i18n.t("System fee")}</Text>
            <Text style={styles.textStyle}>
              {fn2f(loanData.manageFeeDetail.manageFee)}
            </Text>
          </View>

          <View style={styles.feeUnflodItemStyle}>
            <Text style={styles.textStyle}>
              {i18n.t("Processing Fee Charges")}
            </Text>
            <Text style={styles.textStyle}>RS.0</Text>
          </View>

          <View style={styles.feeUnflodItemStyle}>
            <Text style={styles.textStyle}>{i18n.t("Any other charges")}</Text>
            <Text style={styles.textStyle}>RS.0</Text>
          </View>
        </View>
      )}

      <View style={styles.listItemStyle}>
        <Text>{i18n.t("Markup")}</Text>
        { optWithDaysConfig[daysOption].days === 30 &&
          <Text style={{flex: 1,marginLeft: 6}}>{`(${i18n.t("APR")}:${loanData.yearInterestRate}%)`}</Text>
          }
        <Text style={styles.listItemTitle}>{fn2f(loanData.totalInterest)}</Text>
      </View>

      <View style={styles.listItemStyle}>
        <Text>{i18n.t("DisburseAmount")}</Text>
        <Text style={styles.listItemTitle}>{fn2f(loanData.disburseMoney)}</Text>
      </View>

      <View style={styles.listItemStyle}>
        <Text>{i18n.t("Lump Sum Repayment Amount")}</Text>
        <Text style={styles.listItemTitle}>
          {fn2f(loanData.dueRepayAmount)}
        </Text>
      </View>

      <View style={styles.listItemStyle}>
        <Text>{i18n.t("Due Date")}</Text>
        <Text style={styles.listItemTitle}>{loanData.repaymentDate}</Text>
      </View>

      {optWithDaysConfig[daysOption].days === 30 && (
        <View style={styles.listItemStyle}>
          <Text style={{ color: "#00B295", fontWeight: "bold" }}>
            {i18n.t("Late Payment Charges")}
          </Text>
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 8, marginTop: 2 }}
            onPress={showKindTips}
          >
            <Image
              source={require("@assets/applyLoan/loan_ic_tips.png")}
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
          <Text style={{ color: "#00B295", fontWeight: "bold" }}>
            {fn2f(loanData.dailyLateFee)}
          </Text>
        </View>
      )}

      <Modal visible={showTips} animationType="none" transparent={true}>
        <View style={styles.otherContainer}>
          <View style={styles.tipStyle}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#0A233E" }}
            >
              {i18n.t("Kind Tips")}
            </Text>
            <Text
              style={{
                marginTop: 12,
                color: "#4F5E6F",
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              {i18n.t("KindTips2")}
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 24,
                borderRadius: 3,
                backgroundColor: "#0825B8",
                width: "96%",
                height: 46,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowTips(false)}
            >
              <Text style={{ color: "#ffffff" }}>{i18n.t("I Know")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },

  listItemStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 35,
    fontSize: 15,
    color: "#4F5E6F",
  },

  listItemTitle: { color: "#0A233E", fontWeight: 800 },

  feeItemStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingEnd: 12,
    height: 46,
    fontSize: 15,
    color: "#4F5E6F",
  },

  imageStyle: {
    width: 12,
    height: 12,
  },

  feeUnflodStyle: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
  },

  feeUnflodItemStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 24,
  },

  textStyle: {
    fontSize: 12,
    fontWeight: 500,
    color: "#4F5E6F",
    fontWeight: 500,
  },

  tipStyle: {
    width: "82%",
    height: 220,
    paddingHorizontal: 12,
    paddingTop: 18,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  otherContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
