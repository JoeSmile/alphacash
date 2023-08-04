import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { Process } from "./Process";

import { useEffect,useState } from "react";
import { statusToImg } from "@const";
import { useUserQuota } from "@store";
import { useGetUserQuota } from "@apis/hooks";
import { formatNumberToFinancial as fn2f } from "@utils";
import { QuotaButtons } from "./QuotaButtons";
import { useIsFocused } from '@react-navigation/native';


export function Quota() {
  const { i18n, setLocale, locale } = useI18n();
  const { mutate: getUserQuota, data: axiosRes } = useGetUserQuota();
  const [cashLoan, setCashLoan, bill, hasBill] = useUserQuota((s) => [
    s.cashLoan,
    s.setCashLoan,
    s.bill,
    s.hasBill,
  ]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getUserQuota();
  }, [isFocused]);

  useEffect(() => {
    const cashloan = axiosRes?.data?.data?.cashLoan;
    if (cashloan) {
      console.log('Sun >>> cashloan isModifyInfo === ' + cashloan.isModifyInfo)
      setCashLoan(cashloan);
    }
  }, [axiosRes]);

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
            source={statusToImg[bill.appStatus]}
            style={{
              position: "absolute",
              width: 102,
              height: 73,
              top: -2,
              right: -2,
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
          {i18n.t("MaxAmount")}
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
