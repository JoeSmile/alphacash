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

// get 方式
async function axiosGet(path, parameters) {
  try {
    // const allParameters = await getAllParameters(path, parameters);
    const response = await axios.get(`${baseURL}/api/app${path}`, {
      params: { ...parameters },
    });
    return response;
  } catch (error) {
    console.log('error---', error);
    return null; // Handle the error as needed or return an error object
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
  return axiosPost('/identityinfoDetail', parameters);
}

export async function updateIdentityInfo(parameters) {
  return axiosPost('/identityinfo', parameters);
}

// account 
export async function addAccount (parameters) {
  return axiosPost('/user/addAccount', parameters);
}

export async function deleteEWalletAccount (parameters) {
  return axiosPost('/user/account/delEwallet', parameters);
}

export async function deleteBankAccount (parameters) {
  return axiosPost('/user/account/delBank', parameters);
}

export async function getAccounts (parameters) {
  return axiosPost('/user/bankEwalletList', parameters);
}

export async function getBankList (parameters) {
  return axiosPost('/bank/list', parameters);
}

// applyLoan form
export async function getCashLoanProductConfig(parameters){
  return axiosPost('/user/cashLoanProductConfig',parameters)
}

export async function getApplyCheckParams(parameters){
  return axiosGet('/cashLoan/apply/checkParams',parameters)
}

export async function getApplyCreateBill(parameters){
  return axiosGet('/cashLoan/createBill',parameters)
}