import React, { useState, useEffect } from "react";
import { View } from "react-native";
import BillList from "./BillList";
import { LOAN_STATUS } from "@const/otherOptions";
import { getBills } from "@apis";

const curBillStatus = [
  LOAN_STATUS.checking,
  LOAN_STATUS.transferring,
  LOAN_STATUS.failed,
  LOAN_STATUS.using,
  LOAN_STATUS.overdue,
];

export default function Processing({ bills }) {
  const [abills, setBills] = useState([]);
  useEffect(() => {
    async function fetchBills() {
      const bills = await getBills(1);
      if (bills) {
        console.log("current bills: ", bills);
        setBills(bills);
      }
    }
    fetchBills();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BillList
        bills={bills.filter((it) => curBillStatus.includes(it.appStatus))}
      />
    </View>
  );
}
