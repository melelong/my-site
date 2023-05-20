import request from "@/utils/request";
// 获取首页标语
export async function getBanner() {
  return await request({
    url: "/api/banner",
    method: "get",
  });
}

// 设置首页标语
export async function setBanner(data) {
  return await request({
    url: "/api/banner",
    method: "post",
    data,
  });
}
