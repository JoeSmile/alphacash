import { acc } from "react-native-reanimated";

export function formatNumberToFinancial(number) {
  if (number === undefined || number === null) {
    return "";
  }
  // 先将数字转换为字符串
  let numStr = number.toString();

  // 使用正则表达式在每三个数字之间插入逗号
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return "Rs." + numStr;
}

export function formatAccountToFinancial(account) {
  if (typeof account !== "string") {
    return "";
  }

  // 使用正则表达式在每四个数字之间插入空格
  const accStr = account.replace(/\B(?=(\w{4})+(?!\w))/g, " ");

  return accStr;
}
