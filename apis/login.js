import axios from "axios";
import { baseURL } from "../constants/config";
import { getAllParameters } from './commonParameter';

export function getOTP(phoneNumber) {
    return axios.post(`${baseURL}/api/app/otp`, phoneNumber).then((response) => {
          console.log('response.data', response);
          return response
        });
}

export async function login(parameters) {
    const path = `${baseURL}/api/app/login`;
    const allParameters = await getAllParameters(parameters, path);
    console.log("allParameters", allParameters);

    return axios.post(`${baseURL}/api/app/login`, {
            ...allParameters, sign:'123dsabnwe'}).then((response) => {
          console.log('response.data', response);
          return response
        });
}


string: `app=alphacash&otp=789456&phoneNumber=01238137213&https://alphacashapi.tangbull.com/api/app/loginPOST{0ojkUdVrny#BN3RRH63P}`
sign: '1d5389e7fe6b0263ce4c0b0b0859e4bc56526a71'