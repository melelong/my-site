// 防抖函数
export default function debounce(fn, delay = 1000) {
  let timer = null;
  return (...args) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
