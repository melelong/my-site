import request from "@/utils/request";
// 获取全局设置
export async function findSetting() {
  return await request({
    url: "/api/setting",
    method: "get",
  });
}
// 修改全局设置
export async function editSetting(data) {
  console.log(data);
  return await request({
    url: "/api/setting",
    method: "put",
    data,
  });
}
