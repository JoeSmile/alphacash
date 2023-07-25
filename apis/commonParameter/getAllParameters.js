import { commonParams, getAppLocation } from "./common";
import { encodeSHA } from "./cryptoParameters";

const salt = "0ojkUdVrny#BN3RRH63P";

function getRawParameters(rawParameters, path) {
  let rawString = "";
  Object.keys(rawParameters)
    .sort()
    .forEach((key) => {
      if (rawParameters[key]) {
        rawString += `${key}=${rawParameters[key]}&`;
      }
    });
  const completeString = `${rawString}${path}POST{${salt}}`;
  console.log("completeString", completeString);
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
  const loc = await getAppLocation();
  //const loc = {};
  const rawParameters = { ...commonParams, ...loc, ...parameters };
  const rawString = getRawParameters(rawParameters, path);

  // sign
  const sign = await encodeSHA(rawString);

  const notEmptyParameters = filterParameters(rawParameters);
  // parameters
  return {
    ...parameters,
    ...notEmptyParameters,
    sign,
  };
}
