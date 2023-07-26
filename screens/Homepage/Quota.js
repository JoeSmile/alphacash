import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";
import { Process } from "./Process";
import { FButton } from "@components/FButton";
import { useGetUserQuota } from "@apis";
import { useEffect, useState } from "react";
import { LOAN_STATUS, statusToImg } from "@const";
import { useUserQuota } from "@store";
import { formatNumberToFinancial as fn2f } from "@utils";
import { QuotaButtons } from "./QuotaButtons";

export function Quota() {
  const { i18n, setLocale, locale } = useI18n();
  const navigation = useNavigation();
  const [cashLoan, setCashLoan, bill, hasBill] = useUserQuota((s) => [
    s.cashLoan,
    s.setCashLoan,
    s.bill,
    s.hasBill,
  ]);
  const { mutate: getUserQuota, data } = useGetUserQuota();

  useEffect(() => {
    getUserQuota();
  }, []);

  useEffect(() => {
    const cashLoan = data?.data?.data?.cashLoan;
    if (cashLoan) {
      setCashLoan(cashLoan);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {hasBill && (
          <Image
            source={statusToImg[bill.loanStatus]}
            style={{
              position: "absolute",
              width: 102,
              height: 73,
              top: 0,
              right: 0,
            }}
          />
        )}

        <Text
          style={{
            fontSize: 16,

            color: "#0A233E",
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          Max Amount
        </Text>
        <Text
          style={{
            fontSize: 40,
            marginBottom: 15,
            fontWeight: 600,
          }}
        >
          {fn2f(bill.applyAmount) || fn2f(cashLoan.quota) || "Rs. 60,000"}
        </Text>
      </View>
      <QuotaButtons />
      {!hasBill && <Process />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingBottom: 25,
    paddingHorizontal: 15,
    borderRadius: 4,
    position: "relative",
    boxShadow:
      "1px 1px 3px 1px rgba(0, 0, 0, 0.1),1px 1px 2px 1px rgba(0, 0, 0, 0.06)",
  },
});
