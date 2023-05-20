import ins from "./request";
/**
 * 获取关于我的页面
 */
async function getAbout() {
  return await ins.get("/api/about");
}
export default {
  getAbout,
};
