import * as Crypto from 'expo-crypto';

export async function encodeSHA(parameters) {
    const response = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        'Easy to Digest!'
      );

    console.log("response",response);
    return response;
}