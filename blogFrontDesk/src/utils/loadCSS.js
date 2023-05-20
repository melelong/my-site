// 动态加载CSS文件
export default function loadCSS(url, type) {
  const cssNode = document.createElement("style");
  cssNode.setAttribute("type", "text/css");
  cssNode.setAttribute("data-type", type);
  cssNode.innerText = `@import url(${url});`;
  document.head.appendChild(cssNode);
}
