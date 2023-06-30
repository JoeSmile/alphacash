import * as Crypto from 'expo-crypto';

export async function encodeSHA(parametersString = '') {
    const response = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA1,
        parametersString
      );

    console.log("response",response);
    return response;
}
