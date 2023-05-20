// 日期格式化
export default function (timestamp, showTime = false) {
  const date = new Date(+timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}${
    showTime ? ` ${h}:${m}:${s}` : ""
  }`;
}
