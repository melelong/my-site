import request from "@/utils/request";
// 分页获取文章
export async function findBlog(
  page = 1,
  limit = 10,
  keyword = "",
  categoryId = -1
) {
  return await request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
      keyword,
      categoryId,
    },
  });
}

// 删除文章
export async function delBlog(id) {
  return await request({
    url: `/api/blog/${id}`,
    method: "delete",
  });
}

// 修改单个文章
export async function editBlog({ id, data }) {
  return await request({
    url: `/api/blog/${id}`,
    method: "put",
    data,
  });
}

// 获取单个文章
export async function FindOneBlog(id) {
  return await request({
    url: `/api/blog/${id}`,
    method: "get",
  });
}

// 发布文章
export async function addBlog(data) {
  return await request({
    url: `/api/blog`,
    method: "post",
    data,
  });
}
