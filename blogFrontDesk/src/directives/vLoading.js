import { Loading } from "@/components";
import { getComponentRootDom } from "@/utils";
// 导出指令的配置对象
export default function (el, binding) {
  // 根据binding.value的值，决定创建或删除div元素
  const isDom = el.querySelector(".loading-container");
  if (binding.value) {
    if (!isDom) {
      const loadingDom = getComponentRootDom(Loading, {
        color1: "#6b9eee",
        color2: "#202020",
        size: "30%",
      });
      el.appendChild(loadingDom);
    }
  } else {
    isDom && isDom.remove();
  }
}
