import request from "@/utils/request";

// 分页获取留言
export async function findMessage(page = 1, limit = 10, keyword = "") {
  return await request({
    url: "/api/message",
    method: "get",
    params: {
      page,
      limit,
      keyword,
    },
  });
}

// 删除留言
export async function delMessage(id) {
  return await request({
    url: `/api/message/${id}`,
    method: "delete",
  });
}
