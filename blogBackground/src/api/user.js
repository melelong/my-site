import request from "@/utils/request";
// 登录
export async function loginApi(data) {
  return await request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

// 恢复登录
export async function getInfo() {
  return await request({
    url: "/api/admin/whoami",
    method: "get",
  });
}

// 更新信息
export async function updateInfo(data) {
  return await request({
    url: "/api/admin",
    method: "put",
    data,
  });
}

// 百度统计
// 获取统计
export async function getTongJi() {
  return await request({
    url: "/api/tongji",
    method: "get",
  });
}
// 设置统计
export async function setTongJi(data) {
  return await request({
    url: "/api/tongji",
    method: "put",
    data,
  });
}
// 获取ACCESS_TOKEN;
export async function getTongJiTOKEN({ CODE, APIKey, SecretKey }) {
  return await request({
    url: `/oauth/2.0/token`,
    method: "get",
    params: {
      grant_type: "authorization_code",
      code: CODE,
      client_id: APIKey,
      client_secret: SecretKey,
      redirect_uri: "oob",
    },
  });
}
// 更新ACCESS_TOKEN
export async function updateRefreshToken({ refresh_token, APIKey, SecretKey }) {
  return await request({
    url: `/oauth/2.0/token`,
    method: "get",
    params: {
      grant_type: "refresh_token",
      refresh_token,
      client_id: APIKey,
      client_secret: SecretKey,
    },
  });
}
