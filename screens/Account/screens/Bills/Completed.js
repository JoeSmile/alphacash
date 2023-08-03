import React, { useEffect } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import BillList from "./BillList";
import { LOAN_STATUS } from "@const";
import { useBillList } from "@apis/hooks";
import { useI18n } from "@hooks/useI18n";


export default function Completed() {
  const oldBillStatus = [LOAN_STATUS.refused, LOAN_STATUS.repaid];
  const { mutate: getBills, data: axiosRes, isLoading } = useBillList();
  const bills = axiosRes?.data?.data;
  const { i18n } = useI18n();


  useEffect(() => {
    getBills({
      tab: 2,
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
              oldBillStatus.includes(it.appStatus)
            )}
          />
        </View>
      )}
    </View>
  );
}
