import request from "@/utils/request";
// 获取关于
export async function findAbout() {
  return await request({
    url: "/api/about",
    method: "get",
  });
}

// 编辑关于
export async function editAbout(data) {
  return await request({
    url: "/api/about",
    method: "post",
    data,
  });
}
