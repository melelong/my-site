import ins from "./request";
/**
 * 分页获取博客
 * @param {Number} page 当前页码
 * @param {Number} limit 页容量
 * @param {*} categoryId 所属分类，-1表示全部
 * @param {String} keyword 模糊查询的关键字
 *
 */
async function getBlogs(data) {
  return await ins.get("/api/blog", {
    params: data,
  });
}

/**
 * 获取所有博客分类
 */
async function getBlogTypes() {
  return await ins.get("/api/blogtype");
}
/**
 * 获取单个博客
 * @param {Number} id 博客的id
 */
async function getBlog(id) {
  return await ins.get(`/api/blog/${id}`);
}
/**
 * 提交评论
 * @param {Object} commentInfo 评论信息
 * body: {
    nickname: "昵称",
    content: "评论内容，纯文本",
    blogId: <id>	#评论的博客id
  }
 */
async function postComment(commentInfo) {
  return await ins.post(`/api/comment`, commentInfo);
}
/**
 * 分页获取评论
 * @param {Number} page 当前页码
 * @param {Number} limit 页容量
 * @param {*} blogid 所属文章，-1表示不限
 * @param {String} keyword 模糊查询的关键字
 */
async function getComments(page = 1, limit = 10, blogid = -1, keyword = "") {
  return await ins.get("/api/comment", {
    params: {
      page,
      limit,
      blogid,
      keyword,
    },
  });
}

// 导出
export default {
  getBlogs,
  getBlogTypes,
  getBlog,
  postComment,
  getComments,
};
