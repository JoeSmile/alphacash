// 引入 CryptoJS 库

import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

const rasPublicKey =
  "-----BEGIN PUBLIC KEY-----" +
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9S0A63K+eyQTZem+HPmf+MPXp" +
  "fTx+yEeIW9DJc6NgDoolqpetJaoLApmAvEUr5K43Penamw2LrheYQBASt2jzwH+v" +
  "jRsruMSNLdepWeajDbgmOb66tNccxpxuYyUSb68Mk68FMMZEErT8hO+jAq3eUIZl" +
  "6FfvwTKO9HTgsil1xwIDAQAB" +
  "-----END PUBLIC KEY-----";

/**
 * 生成16位不重复的随机数，含数字+大小写  AES_128-ECB 密钥需为16位
 * @return
 */
export function getAesKey(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// AES加密函数
export function encryptAES(text, key) {
  //const iv = CryptoJS.lib.WordArray.random(16); // 随机生成初始向量
  const cipherText = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(text),
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const cipherString = cipherText.ciphertext.toString(CryptoJS.enc.Base64);

  console.log("AES crypt: text ", text);
  console.log("AES crypt: key", key);
  console.log("AES crypt: aes string", cipherString);

  return cipherString;
}

// RSA加密函数
export function encryptRSA(text) {
  var encryptor = new JSEncrypt(); // 创建加密对象实例
  encryptor.setPublicKey(rasPublicKey); //设置公钥
  var rsaPassWord = encryptor.encrypt(text); // 对内容进行加密

  console.log("RSA crypt: src string", text);
  console.log("RSA crypt: rsa string", rsaPassWord);

  return rsaPassWord;
}
