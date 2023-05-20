import { banner } from "@/api";
// banner图片数据存到vuex里
export default {
  namespaced: true,
  state: {
    isLoading: false,
    data: [],
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
    async fetchBanner(ctx) {
      if (ctx.state.data.length) return;
      ctx.commit("setIsLoading", true);
      const resp = await banner.getBanners();
      ctx.commit("setData", resp);
      ctx.commit("setIsLoading", false);
    },
  },
};
