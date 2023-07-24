import { create } from "zustand";

export const useUserQuota = create((set, get) => ({
  cashLoan: {
    //默认金额
    "quota": 60000,
    //是否有资格申请
    "isEligible": true,
    //用户类型 1 新客户 2 老客户
    "userType": 1,
    //审核驳回 - 是否需要重传照片 
    "isModifyInfo": true,
    //审核驳回 - 是否需要重传人脸识别照
    "isModifyFaceImage": true,
    //是否展示还款提醒
    "isOpenRepayment":true,
    "bill": {
        //贷款id
        "loanId":1,
        //到期时间
        "dueDate":"13/03/2023",
        //申请金额
        "applyAmount":3000,
        //贷款周期
        "loanCycle":30,
        //申请时间
        "applyTime":"12/02/2023",
        //订单状态
        "loanStatus":101,
    }},
  bill: {  //贷款id
    "loanId":1,
    //到期时间
    "dueDate":"13/03/2023",
    //申请金额
    "applyAmount":3000,
    //贷款周期
    "loanCycle":30,
    //申请时间
    "applyTime":"12/02/2023",
    //订单状态
    "loanStatus":101,},
  hasBill: true,
  setCashLoan: (cashLoan) => {
    set({
      cashLoan,
      bill: cashLoan.bill,
      hasBill: !!Object.keys(cashLoan.bill).length
    })
  }
}));
