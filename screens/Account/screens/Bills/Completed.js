import React, { useEffect } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import BillList from "./BillList";
import { LOAN_STATUS } from "@const";
import { useBillList } from "@apis/hooks";

export default function Completed() {
  const oldBillStatus = [LOAN_STATUS.refused, LOAN_STATUS.repaid];
  const { mutate: getBills, data: axiosRes, isLoading } = useBillList();
  const bills = axiosRes?.data?.data;

  useEffect(() => {
    getBills({
      tab: 2,
      token: "Q6OHu7B2YFCBHz3iUkae8bJTNl1BpG0j1689932285945198",
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
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
