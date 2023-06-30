import { commonParams } from './common';
import { encodeSHA } from './cryptoParameters';

const salt = '0ojkUdVrny#BN3RRH63P';


function getRawParameters(parameters, path) {
    const rawParameters = {...commonParams, ...parameters};
    let rawString = '';
    Object.keys(rawParameters).sort().forEach(key => {
        if(rawParameters[key]) {
            rawString += `${key}=${rawParameters[key]}&`;
        }
    })
    const completeString = `${rawString}${path}POST{${salt}}`
    console.log('completeString', completeString);
    return completeString;
}

function filterParameters () {
    const obj = {}
    Object.keys(commonParams).forEach(key => {
        if(commonParams[key]) {
            obj[key] = commonParams[key]
        }
    })
    return obj
}

// parameters is object
export async function getAllParameters(parameters = {}, path) {
    // common parameters
    const rawString = getRawParameters(parameters, path);

    // sign
    const sign = await encodeSHA(rawString)

    const notEmptyParameters = filterParameters();
    // parameters
    return {
        ...parameters,
        ...notEmptyParameters,
        sign
    }
}