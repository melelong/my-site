import { about } from "@/api";
// 关于我的页面路径存到vuex里
export default {
  namespaced: true,
  state: {
    isLoading: false,
    data: "",
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchAbout(ctx) {
      if (ctx.state.data) return;
      ctx.commit("setIsLoading", true);
      const resp = await about.getAbout();
      ctx.commit("setData", resp);
      ctx.commit("setIsLoading", false);
    },
  },
};
