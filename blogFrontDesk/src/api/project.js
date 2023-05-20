import ins from "./request";
/**
 * 获取所有项目
 */
async function getProjects() {
  return await ins.get("/api/project");
}
export default {
  getProjects,
};
