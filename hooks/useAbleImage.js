
import { useUserQuota } from "@store/useUserQuota";
import { useEffect, useState } from 'react';

      //当有用户贷款行为时（审核中、打款中、使用中、逾期）或该用户变为老用户后，与姓名+CNIC+身份证正反面+手持照片不可修改
export const useAbleImage = () => {
  const [ableEdit, setAbleEdit] = useState(true);
  //用户类型 1 新客户 2 老客户
  //"userType": 1,
  const [bill, hasBill, cashLoan] = useUserQuota((s) => [s.bill, s.hasBill, s.cashLoan]); 
  useEffect(() => {
    if ((hasBill && (bill.appStatus == 101 || bill.appStatus == 201 || bill.appStatus == 301 || bill.appStatus == 303)) || cashLoan?.userType  == 2  ) {
      setAbleEdit(false)
    }
  }, [hasBill, bill, cashLoan]);
  
  return ableEdit
}