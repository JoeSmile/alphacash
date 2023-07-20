import axios from "axios";
import { baseURL } from "@const/config";

export function getBills(tab) {
  return axios.post(`${baseURL}/api/app/loan/bills`, { tab }).then(
    (response) => {
      return response.status === 200 && response.data;
    },
    () => {}
  );
}

export function getBillDetail(loanId) {
  return axios.post(`${baseURL}/api/app/loan/billDetail`, { loanId }).then(
    (response) => {
      return response.status === 200 && response.data;
    },
    () => {}
  );
}
