import axios from "axios";
import { baseURL } from "../constants/config";
import { getAllParameters } from './commonParameter';

// async function axiosPost(path, parameters) {
//   const allParameters = await getAllParameters(path, parameters);
//   return axios.post(`${baseURL}/api/app${path}`, {...parameters}).then((response) => {
//     return response
//   });
// }
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

export async function login() {
  return postJSON('/login', {
    sign: '123dsabnwe',
    phoneNumber:'01238137213',
    otp:'789456',
    app:'alphacash'
  });
}

export async function getUserFormStatus() {
  return postJSON('/userFormStatus', {
    token: "YMIQoeBldXWES0rY9s8uJ0oI4CPXTfn61688608523438974",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}

export async function getPersonalInfoDetail() {
  return postJSON('/personalinfoDetail', {
    token: "YMIQoeBldXWES0rY9s8uJ0oI4CPXTfn61688608523438974",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}
export async function getWorkInfoDetail() {
  return postJSON('/workinfoDetail', {
    token: "0XmSjfM7IsUT0OKvaXtuqAk3uhEBNPAd1688644279741535",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}

export async function getReferenceContactDetail() {
  return postJSON('/referenceContactDetail', {
    token: "0XmSjfM7IsUT0OKvaXtuqAk3uhEBNPAd1688644279741535",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}


export async function getIdentityInfoDetail() {
  return postJSON('/identityinfoDetail', {
    token: "0XmSjfM7IsUT0OKvaXtuqAk3uhEBNPAd1688644279741535",
    sign: '123dsabnwe',
    app:'alphacash'
  });
}
//  update


export async function updatePersonalInfo() {
  return postJSON('/personalinfo', {
    token: "0XmSjfM7IsUT0OKvaXtuqAk3uhEBNPAd1688644279741535",
    sign: '123dsabnwe',
    app:'alphacash',
    name: 'JJ',
    birth: '01/01/2000',
    gender: 1,
    cnic: '1234567890123',
    education: 1,
    maritalStatus: 1,
    provinceId: 2,
    provinceName: 'Balochistan',
    cityId: 35,
    cityName: 'Khuzdar'	,
    addressDetail: 'xxxx'	,
    email: 'xxx@aaa.com'	,
    creditType: 1
  });
}


export async function updateWorkInfo() {
  return postJSON('/workinfo', {
    token: "0XmSjfM7IsUT0OKvaXtuqAk3uhEBNPAd1688644279741535",
    sign: '123dsabnwe',
    app:'alphacash',
    workField:  20,
    workName: 'workName',
    companyName: 'companyName',
    companyPhone: '12345678901',
    serviceLength: 3,
    monthlyIncome: 4,
    companyProvinceId: 2,
    companyProvinceName: 'Balochistan',
    companyCityId: 35,
    companyCityName: 'Khuzdar',
    companyAddressDetail: 'Balochistan',
    // haveOtherLoans,
    // lendingInstitution,
    // loanAmount,
    creditType: 1,
  });
}

export async function updateReferenceContact() {
  return postJSON('/referenceContact', {
    token: "0XmSjfM7IsUT0OKvaXtuqAk3uhEBNPAd1688644279741535",
    sign: '123dsabnwe',
    app:'alphacash',
    creditType: 1,
  });
}


