// 图片懒加载
import bus from "@/eventBus";
import { debounce } from "@/utils";
import defaultImg from "@/assets/default.jpg";
let imgs = [];
function setImg(img) {
  // 处理图片
  // 该图片是否在视口范围内
  img.dom.src = defaultImg;
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if (rect.top >= -height && rect.top <= clientHeight) {
    // 在视口范围内
    // const tempImg = new Image();
    // tempImg.onload = function () {
    // // 当真实图片加载完成后
    //   img.dom.src = img.src;
    // };
    // tempImg.src = img.src;
    img.dom.src = img.src;
    imgs = imgs.filter((i) => i !== img);
  }
}
// 调用该函数,就可以设置那些合适的图片
function setImgs() {
  for (const img of imgs) {
    // 处理单个图片
    setImg(img);
  }
}
function handleScroll() {
  setImgs();
}
const setImgDebounce = debounce(handleScroll, 50);
bus.$on("mainScroll", setImgDebounce);
export default {
  inserted(el, binding) {
    imgs.push({
      dom: el,
      src: binding.value,
    });
    setImgs();
  },
  unbind(el) {
    imgs = imgs.filter((img) => img.dom !== el);
  },
};
