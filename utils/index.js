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
  const accStr = account.replace(/(\d{4})/g, "$1 ").replace(/\s*$/, "");

  return accStr;
}

export function formatTime(timeInMillis) {
  if (timeInMillis !== Infinity && !isNaN(timeInMillis)) {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = ((timeInMillis % 60000) / 1000).toFixed(0);

    // 补零操作
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
