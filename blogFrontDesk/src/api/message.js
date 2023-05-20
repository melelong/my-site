import ins from "./request";
/**
 * 提交留言
 * @param {Object} messageInfo 留言信息
 * body: {
    nickname: "昵称",
    content: "留言内容，纯文本"
  }
 */
async function postMessage(messageInfo) {
  return await ins.post("/api/message", messageInfo);
}
/**
 * 分页获取留言
 * @param {Number} page 当前页码
 * @param {Number} limit 页容量
 * @param {String} keyword 模糊查询的关键字
 */
async function getMessages(page = 1, limit = 10, keyword = "") {
  return await ins.get("/api/message", {
    params: {
      page,
      limit,
      keyword,
    },
  });
}
// 导出
export default {
  postMessage,
  getMessages,
};
