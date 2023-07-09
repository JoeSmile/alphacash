import axios from "axios";
import { baseURL } from "../constants/config";
import { getAllParameters } from './commonParameter';

async function axiosPost(path, parameters) {
  const allParameters = await getAllParameters(path, parameters);
  return axios.post(`${baseURL}/api/app${path}`, {...parameters}).then((response) => {
    console.log('response-----', response)
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
  return postJSON('/login', parameters);
}

export async function getUserFormStatus() {
  return axiosPost('/userFormStatus', {
    token: "KGTeYE9LxwMGuxmo8j2tiujYGHMv9DMC1688713605317658",
    sign: '123dsabnwe',
    app:'alphacash'
  });
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
  return axiosPost('/workinfooptions', parameters);
}

export async function updateWorkInfo(parameters) {
  return postJSON('/workinfo', parameters);
}

// ReferenceContact form
export async function getReferenceContactDetail() {
  return axiosPost('/referenceContactDetail', {
    token: "KGTeYE9LxwMGuxmo8j2tiujYGHMv9DMC1688713605317658",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}

export async function updateReferenceContact() {
  return postJSON('/referenceContact', {
    token: "KGTeYE9LxwMGuxmo8j2tiujYGHMv9DMC1688713605317658",
    sign: '123dsabnwe',
    app:'alphacash',
    creditType: 1,
  });
}

export async function getReferenceContactOptions(parameters) {
  return axiosPost('/referenceContactOptions', parameters);
}

// identity form
export async function getIdentityInfoDetail() {
  return axiosPost('/identityinfoDetail', {
    token: "KGTeYE9LxwMGuxmo8j2tiujYGHMv9DMC1688713605317658",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}
