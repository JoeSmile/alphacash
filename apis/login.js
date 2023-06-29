import axios from "axios";
import { baseURL } from "../constants/config";

export function getOTP(phoneNumber) {
    return axios.post(`${baseURL}/api/app/otp`, phoneNumber).then((response) => {
          console.log('response.data', response);
          return response
        });
}

export function login(parameters) {
    return axios.post(`${baseURL}/api/app/login`, {
            ...parameters}).then((response) => {
          console.log('response.data', response);
          return response
        });
}

