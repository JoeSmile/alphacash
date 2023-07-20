import { View, StyleSheet, Text, StatusBar, Image } from "react-native";
import { LOAN_STATUS } from "@const/otherOptions";
import { FButton } from "@components/FButton";
import { formatNumberToFinancial as fn2f } from "@utils";

const statusToImg = {
  [LOAN_STATUS.checking]: require("@assets/bills/loan_tag_under_review.png"),
  [LOAN_STATUS.refused]: require("@assets/bills/loan_tag_reject.png"),
  [LOAN_STATUS.transferring]: require("@assets/bills/loan_tag_disbursing.png"),
  [LOAN_STATUS.failed]: require("@assets/bills/loan_tag_failed.png"),
  [LOAN_STATUS.using]: require("@assets/bills/loan_tag_approved.png"),
  [LOAN_STATUS.overdue]: require("@assets/bills/loan_tag_overdue.png"),
  [LOAN_STATUS.repaid]: require("@assets/bills/loan_tag_repaid.png"),
  [LOAN_STATUS.cancel]: require("@assets/bills/loan_tag_reject.png"),
};

const item = {
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
  lateCharge: "200",
  repaymentDate: "30/07/2023",
};

export default function BillDetail({ route }) {
  const { billid } = route.params;
  const hasDueDateBillStatus = [
    LOAN_STATUS.using,
    LOAN_STATUS.overdue,
    LOAN_STATUS.repaid,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Image
          source={statusToImg[item.status]}
          contentFit="cover"
          transition={1000}
          style={styles.imgTag}
        />
        <View>
          <Text style={styles.title}>Loan Amount: </Text>
          <Text style={styles.amount}>{fn2f(item.getAmount)}</Text>
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
        <View style={[styles.line, { marginBottom: 12 }]}></View>
        <View>
          <Text style={[styles.title, { marginBottom: 8 }]}>
            Collection Account:
          </Text>
          <Text style={styles.titleValue}>{item.account}</Text>
        </View>
        {hasDueDateBillStatus.includes(item.status) && !!item.dueDate && (
          <>
            <View style={[styles.line, { marginTop: 16 }]}></View>
            <View style={styles.info}>
              <Text style={styles.title}>Loan Date: </Text>
              <Text style={styles.titleValue}>{item.loanDate}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.info}>
              <Text style={styles.title}>Markup: </Text>
              <Text style={styles.titleValue}>{fn2f(item.markup)}</Text>
            </View>
            {item.status !== LOAN_STATUS.using &&
              !!parseInt(item.lateCharge) && (
                <>
                  <View style={styles.line}></View>
                  <View style={styles.info}>
                    <Text style={styles.title}>Late Payment Charges: </Text>
                    <Text style={styles.titleValue}>
                      {fn2f(item.lateCharge)}
                    </Text>
                  </View>
                </>
              )}
            <View style={styles.line}></View>
            <View style={styles.info}>
              <Text style={styles.title}>Lump Sum Repayment Amount: </Text>
              <Text style={styles.titleValue}>{fn2f(item.lumpSum)}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.info}>
              <Text style={styles.title}>Due Date: </Text>
              <Text style={styles.titleValue}>{item.dueDate}</Text>
            </View>
            {item.status === LOAN_STATUS.repaid && item.repaymentDate && (
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
      {/*<FButton
        style={styles.repayBtn}
        onPress={() => navigation.push("Apply")}
        title="Repay Now"
      />*/}
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
