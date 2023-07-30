import { commonParams } from "./common";
import { encodeSHA } from "./cryptoParameters";
import { baseURL } from "@const/config";

const salt = "0ojkUdVrny#BN3RRH63P";

function getRawParameters(rawParameters, path) {
  let rawString = `POST${baseURL}/api/app${path}`;
  Object.keys(rawParameters)
    .sort()
    .forEach((key) => {
      const val = rawParameters[key];
      if (typeof val === "string" && val && key !== "sign") {
        rawString += `${key}${val}`;
      }
    });
  const completeString = `${rawString}${salt}`;
  //console.log("completeString", completeString);
  return completeString;
}

function filterParameters(rawParameters) {
  const obj = {};
  Object.keys(rawParameters).forEach((key) => {
    if (rawParameters[key]) {
      obj[key] = rawParameters[key];
    }
  });
  return obj;
}

// parameters is object
export async function getAllParameters(path, parameters = {}) {
  // common parameters
  const rawParameters = { ...commonParams, ...parameters };
  const rawString = getRawParameters(rawParameters, path);

  // sign
  const sign = await encodeSHA(rawString);

  const notEmptyParameters = filterParameters(rawParameters);
  // parameters
  return {
    //...parameters,
    ...notEmptyParameters,
    sign,
  };
}
