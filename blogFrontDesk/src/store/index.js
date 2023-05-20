import { Store, install } from "vuex";
import Vue from "vue";
// 导入需要存到vuex里的数据
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";
import blog from "./blog";
!window.Vuex && install(Vue);
const store = new Store({
  // 模块注册
  modules: {
    banner,
    setting,
    about,
    project,
    blog,
  },
  strict: true, // 开启严格模式后，只允许通过mutation改变状态
});
export default store;
