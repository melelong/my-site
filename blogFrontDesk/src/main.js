// 入口文件
import Vue from "vue"; // 导入vue
import App from "./App.vue"; // 导入根组件
import "./styles/global.less"; // 导入全局样式
import router from "./router"; // 路由配置
import "./eventBus"; // 事件总线
import store from "./store"; // vuex
// Vue.config.productionTip = false
store.dispatch("setting/fetchSetting");
// 模拟数据
// import "./mock";

// 注册指令
import { vLoading, vLazy } from "./directives";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);
// 扩展Vue
import { showMessage } from "@/utils";
Vue.prototype.$showMessage = showMessage;
// 配置vue
const vm = new Vue({
  router,
  store,
  render: (h) => h(App), // 把根组件模板变成render函数,之后转化成Vnode树再生成真实的dom树
}).$mount("#app"); // 把真实dom树挂载到id为app的模板元素上
