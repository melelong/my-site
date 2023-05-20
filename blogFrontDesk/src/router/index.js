import Vue from "vue"; // 导入vue
import VueRouter from "vue-router"; // 导入路由插件
import routes from "./routes"; // 导入路由匹配规则
import { titleController } from "@/utils";
// 使用路由插件
!window.VueRouter && Vue.use(VueRouter); // 使用一个vue插件

// 配置路由
const router = new VueRouter({
  // 路由匹配规则
  routes,
  // 路由模式
  // mode: "hash",
  mode: "history",
});
// 设置网站标题
router.afterEach((to, from) => {
  to.meta.title && titleController.setRouteTitle(to.meta.title);
});
// 导出路由配置
export default router;
