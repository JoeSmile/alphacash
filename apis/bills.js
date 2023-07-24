import { axiosPost } from "./basic";

export function getBills(param) {
  return axiosPost("/loan/bills", param);
}

export function getBillDetail(param) {
  return axiosPost(`/loan/billDetail`, param);
}
