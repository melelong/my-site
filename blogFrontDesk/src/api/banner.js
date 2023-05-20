import ins from "./request";
/**
 * 获取banner数据
 */
async function getBanners() {
  return await ins.get("/api/banner");
}
export default {
  getBanners,
};
