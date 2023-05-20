import request from "@/utils/request";

// 获取所有项目
export async function findProject() {
  return await request({
    url: `/api/project`,
    method: "get",
  });
}

// 添加项目
export async function addProject(data) {
  return await request({
    url: `/api/project`,
    method: "post",
    data,
  });
}

// 删除项目
export async function delProject(id) {
  return await request({
    url: `/api/project/${id}`,
    method: "delete",
  });
}

// 编辑项目
export async function setProject(id, data) {
  return await request({
    url: `/api/project/${id}`,
    method: "put",
    data,
  });
}
