import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n } from "@hooks/useI18n";
import { Process } from "./Process";

import { useEffect,useState } from "react";
import { statusToImg } from "@const";
import { useUserQuota } from "@store";
import { formatNumberToFinancial as fn2f } from "@utils";
import { QuotaButtons } from "./QuotaButtons";
import { useGetUserFormStatus } from "@apis";

export function Quota() {
  const { i18n } = useI18n();
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
      setIsFormCompleted(status.isCompletedPersonal && status.isCompletedWork && status.isCompletedContact && status.isCompletedIdentity);
    }
  }, [data]);

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
          {fn2f(bill.applyAmount) || fn2f(cashLoan.quota) || "Rs.60,000"}
        </Text>
      </View>
      <QuotaButtons />
      {(hasBill ? false : isFormCompleted ? false: true) && <Process />}
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
