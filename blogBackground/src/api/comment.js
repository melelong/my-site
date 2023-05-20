import request from "@/utils/request";

// 分页获取评论
export async function findComment(
  page = 1,
  limit = 10,
  keyword = "",
  blogid = -1
) {
  return await request({
    url: "/api/comment",
    method: "get",
    params: {
      page,
      limit,
      keyword,
      blogid,
    },
  });
}

// 删除评论
export async function delComment(id) {
  return await request({
    url: `/api/comment/${id}`,
    method: "delete",
  });
}
