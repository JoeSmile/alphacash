import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n } from "@hooks/useI18n";
import { Process } from "./Process";

import { useEffect, useState } from "react";
import { getStatusImgByLocale } from "@const";
import { useUserQuota } from "@store";
import { formatNumberToFinancial as fn2f } from "@utils";
import { QuotaButtons } from "./QuotaButtons";
import { useGetUserFormStatus } from "@apis";

const displayLoanAmount = [
  101, 201, 202
]
const displayLumpSumRepaymentAmount = [
  301, 303
]

export function Quota({
  setVisible,
  setType
}) {
  const { i18n, locale } = useI18n();
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const { mutate: getUserFormStatus, data, isLoading } = useGetUserFormStatus();
  const [cashLoan, bill, hasBill] = useUserQuota((s) => [
    s.cashLoan,
    s.bill,
    s.hasBill,
  ]);

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

  const setAmount = () => {
    if(!hasBill){
      return fn2f(cashLoan.quota);
    } else if([301,303].includes(bill.appStatus)){
      return fn2f(bill.currentAmountDue)
    } else {
      return fn2f(bill.applyAmount)
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {hasBill && (
          <Image
            source={getStatusImgByLocale(bill.appStatus, locale)}
            style={[{
              position: "absolute",
              width: 102,
              height: 73,
              top: -2,
            },  locale == 'en' ? {right: -2} : {left: -2}]}
          />
        )}

        <Text
          style={{
            fontSize: 16,
            color: "#0A233E",
            marginTop: 30,
            marginBottom: 15,
            zIndex: 100
          }}
        >
          { hasBill ? (
            displayLumpSumRepaymentAmount.includes(bill.appStatus) ? i18n.t("Lump Sum Repayment Amount") : i18n.t("LoanAmount")
          ) : i18n.t("MaxAmount")}
        </Text>
        <Text
          style={{
            fontSize: 40,
            marginBottom: 15,
            fontWeight: 600,
          }}
        >
          {setAmount()}
        </Text>
      </View>
      <QuotaButtons setVisible={setVisible} setType={setType} />
      {(hasBill ? false : isFormCompleted ? false : true) && <Process />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 4,
    paddingBottom: 12,
    position: "relative",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },
});
