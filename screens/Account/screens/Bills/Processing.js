import React, { useEffect } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import BillList from "./BillList";
import { LOAN_STATUS } from "@const";
import { useBillList } from "@apis/hooks";
import { useI18n } from "@hooks/useI18n";


const curBillStatus = [
  LOAN_STATUS.checking,
  LOAN_STATUS.transferring,
  LOAN_STATUS.failed,
  LOAN_STATUS.using,
  LOAN_STATUS.overdue,
];

export default function Processing() {
  const { i18n } = useI18n();
  const { mutate: getBills, data: axiosRes, isLoading } = useBillList();
  const bills = axiosRes?.data?.data;

  useEffect(() => {
    getBills({
      tab: 1,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={i18n.t('Loading')}
        textStyle={{ color: "#FFF" }}
      />
      {Array.isArray(bills?.orderList) && (
        <View style={{ flex: 1 }}>
          <BillList
            bills={bills.orderList.filter((it) =>
              curBillStatus.includes(it.appStatus)
            )}
          />
        </View>
      )}
    </View>
  );
}
