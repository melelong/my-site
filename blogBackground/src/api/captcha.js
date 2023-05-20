import request from "@/utils/request";
// 获取验证码
export async function getCaptcha() {
  return await request({
    url: "/res/captcha",
    method: "get",
  });
}
