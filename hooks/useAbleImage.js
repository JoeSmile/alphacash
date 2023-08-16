
import { useUserQuota } from "@store/useUserQuota";
import { useEffect, useState } from 'react';

export const useAbleImage = () => {
  const [ableEdit, setAbleEdit] = useState(true);
  const [bill, hasBill, cashLoan] = useUserQuota((s) => [s.bill, s.hasBill, s.cashLoan]); 
  useEffect(() => {
    if ((hasBill && (bill.appStatus == 101 || bill.appStatus == 201 || bill.appStatus == 301 || bill.appStatus == 303)) || cashLoan?.userType  == 2  ) {
      setAbleEdit(false)
    }
  }, []);
  return ableEdit
}