import axios from "axios";
import { baseURL } from "../constants/config";
import { getAllParameters } from "./commonParameter";

export function getOTP(phoneNumber) {
  return axios.post(`${baseURL}/api/app/otp`, phoneNumber).then((response) => {
    console.log("response.data", response.data);
    return response;
  });
}

export async function login(parameters) {
  const path = `${baseURL}/api/app/login`;
  const allParameters = await getAllParameters(parameters, path);
  console.log("allParameters", allParameters);

  return axios
    .post(`${baseURL}/api/app/login`, {
      ...allParameters,
      sign: "123dsabnwe",
    })
    .then((response) => {
      console.log("response.data", response.data);
      return response;
    });
}
