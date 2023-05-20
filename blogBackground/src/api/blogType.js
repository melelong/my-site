import request from "@/utils/request";
// 添加文章分类
export async function addBlogType(data) {
  return await request({
    url: "/api/blogtype",
    method: "post",
    data,
  });
}

// 删除文章分类
export async function delBlogType(id) {
  return await request({
    url: `/api/blogtype/${id}`,
    method: "delete",
  });
}

// 修改单个文章分类
export async function updateOneBlogType(editInfo) {
  return await request({
    url: `/api/blogtype/${editInfo.id}`,
    method: "put",
    data: editInfo.data,
  });
}

// 查找单个文章分类
export async function findOneBlogType(id) {
  return await request({
    url: `/api/blogtype/${id}`,
    method: "get",
  });
}

// 获取所有文章分类
export async function getBlogType() {
  return await request({
    url: `/api/blogtype`,
    method: "get",
  });
}
