import axios from "axios";
import { baseURL } from "../constants/config";

export function getOTP(phoneNumber) {
    return axios.post(`${baseURL}/api/app/otp`, phoneNumber).then((response) => {
          console.log('response.data', response);
          return response
        });
}

export function login(phoneNumber, otp) {
    return axios.post(`${baseURL}/api/app/login`, {
            phoneNumber, otp}).then((response) => {
          console.log('response.data', response);
          return response
        });
}

