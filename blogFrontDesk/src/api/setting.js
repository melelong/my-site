import ins from "./request";

/**
 * 获取全局设置
 */
async function getSetting() {
  return await ins.get("/api/setting");
}
export default {
  getSetting,
};
