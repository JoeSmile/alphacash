import { axiosPost, axiosGet,axiosPostFile } from './basic';

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
  return axiosPost('/identityDetail', parameters);
}

export async function updateIdentityInfo(parameters) {
  return axiosPost('/identityInfo', parameters);
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
  return axiosPost('/cashLoan/apply/checkParams',parameters)
}

export async function applyCreateBill(parameters){
  return axiosPostFile('/cashLoan/createBill',parameters)
}
// homepage
export async function getUserQuota (parameters) {
  return axiosPost('/userQuota', parameters);
}
