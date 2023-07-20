import React, { useEffect } from "react";
import { View } from "react-native";
import BillList from "./BillList";
import { LOAN_STATUS } from "@const/otherOptions";
import { getBills } from "@apis";

export default function Completed({ bills }) {
  const curBillStatus = [
    LOAN_STATUS.checking,
    LOAN_STATUS.transferring,
    LOAN_STATUS.failed,
    LOAN_STATUS.using,
    LOAN_STATUS.overdue,
  ];
  const oldBillStatus = [LOAN_STATUS.refused, LOAN_STATUS.repaid];

  useEffect(() => {
    async function fetchBills() {
      const bills = await getBills(2);
      if (bills) {
        console.log("old bills: ", bills);
      }
    }
    fetchBills();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BillList
        bills={bills.filter((it) => oldBillStatus.includes(it.appStatus))}
      />
    </View>
  );
}
