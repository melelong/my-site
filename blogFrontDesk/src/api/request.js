import axios from "axios";
import { showMessage } from "@/utils";
const ins = axios.create();
// 响应拦截 0为成功 其他为失败，会弹出相应的提示
ins.interceptors.response.use(function (resp) {
  if (resp.data.code === 0) return resp.data.data;
  showMessage({ content: resp.data.msg, type: "error" });
  return null;
});
export default ins;
