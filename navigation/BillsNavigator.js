import Bills from "@screens/Account/screens/Bills";
import BillDetail from "@screens/Account/screens/Bills/BillDetail";

export const BillsScreens = [
  {
    name: "CurrentBills",
    component: Bills,
    headerTitle: "Bill",
  },
  {
    name: "BillDetail",
    component: BillDetail,
    headerTitle: "Bill Details",
  },
];
