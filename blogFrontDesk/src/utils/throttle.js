// 节流函数
export default function throttle(fn, delay = 1000) {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}
