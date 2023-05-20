// 网站标题控制
let routeTitle = "";
let siteTitle = "";
function setTitle() {
  // 判断优化
  const map = [
    [() => !routeTitle && !siteTitle, () => (document.title = "loading...")],
    [() => routeTitle && !siteTitle, () => (document.title = routeTitle)],
    [() => !routeTitle && siteTitle, () => (document.title = siteTitle)],
  ];
  const target = map.find((m) => m[0]());
  target ? target[1]() : (document.title = `${routeTitle}-${siteTitle}`);
}
export default {
  // 设置路由标题
  setRouteTitle(title) {
    routeTitle = title;
    setTitle();
  },
  // 设置仓库标题
  setSiteTitle(title) {
    siteTitle = title;
    setTitle();
  },
};
