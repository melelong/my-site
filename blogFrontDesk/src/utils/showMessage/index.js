import getComponentRootDom from "@/utils/getComponentRootDom";
import Icon from "@/components/Icon";
import style from "./index.module.less";
/**
 * 消息弹窗
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中间；如果不传，默认显示在页面正中间
 */
export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  const div = document.createElement("div");
  const IconDom = getComponentRootDom(Icon, { type });
  div.innerHTML = `<span class="${style.icon}">${IconDom.outerHTML}</span><div>${content}</div>`;
  div.className = `${style.message} ${style[`message-${type}`]}`;
  if (options.container) {
    getComputedStyle(container).position === "static" &&
      (container.style.position = "relative");
  }
  container.appendChild(div);
  div.clientHeight;
  div.style.opacity = 1;
  div.style.transform = `translate(-50%,-50%)`;
  duration !== "" &&
    setTimeout(() => {
      div.clientHeight;
      div.style.opacity = 0;
      div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
      const trans = function () {
        div.removeEventListener("transitionend", trans);
        div.remove();
        options.callback && options.callback();
      };
      div.addEventListener("transitionend", trans, { once: true });
    }, duration);
}
