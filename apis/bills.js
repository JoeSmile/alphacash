import axios from "axios";
import { baseURL } from "@const/config";

export function getBills(param) {
  return axios.post(`${baseURL}/api/app/loan/bills`, param).then(
    (response) => {
      return response.status === 200 && response;
    },
    () => {}
  );
}

export function getBillDetail(param) {
  return axios.post(`${baseURL}/api/app/loan/billDetail`, param).then(
    (response) => {
      return response.status === 200 && response;
    },
    () => {}
  );
}
