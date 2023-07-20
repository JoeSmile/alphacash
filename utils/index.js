export function formatNumberToFinancial(number) {
  // 先将数字转换为字符串
  let numStr = number.toString();

  // 使用正则表达式在每三个数字之间插入逗号
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return "Rs." + numStr;
}
