import axios from "axios";
import { baseURL } from "../constants/config";
import { getAllParameters } from './commonParameter';

async function axiosPost(path, parameters) {
  const allParameters = await getAllParameters(path, parameters);
  return axios.post(`${baseURL}/api/app${path}`, {...parameters}).then((response) => {
    return response
  }) .catch(error => console.log('error---', error));;
}
async function postJSON(path, parameters) {
  // const allParameters = await getAllParameters(path, parameters);
  try {
    const response = await fetch(`${baseURL}/api/app${path}`, {
      method: "POST", // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameters),
    });

    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function getOTP(phoneNumber) {
  return axiosPost('/otp', {phoneNumber})
}

export async function login(parameters) {
  return axiosPost('/login', parameters);
}

export async function getUserFormStatus(parameters) {
  return axiosPost('/userFormStatus',parameters);
}

// personal form
export async function getPersonalInfoDetail(parameters) {
  return axiosPost('/personalinfoDetail', parameters);
}

export async function getPersonalOptions(parameters) {
  return axiosPost('/getpersonaloptions', parameters);
}

export async function updatePersonalInfo(parameters) {
  return axiosPost('/personalinfo',parameters);
}

// job form
export async function getWorkInfoDetail(parameters) {
  return axiosPost('/workinfoDetail', parameters);
}

export async function getWorkInfoOptions(parameters) {
  return axiosPost('/workInfoOptions', parameters);
}

export async function updateWorkInfo(parameters) {
  return axiosPost('/workinfo', parameters);
}

// ReferenceContact form
export async function getReferenceContactDetail(parameters) {
  return axiosPost('/referenceContactDetail', parameters);
}

export async function updateReferenceContact(parameters) {
  return axiosPost('/referenceContact', parameters);
}

export async function getReferenceContactOptions(parameters) {
  return axiosPost('/referenceContactOptions', parameters);
}

// identity form
export async function getIdentityInfoDetail(parameters) {
  return axiosPost('/identityinfoDetail', {
    token: "KGTeYE9LxwMGuxmo8j2tiujYGHMv9DMC1688713605317658",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}
