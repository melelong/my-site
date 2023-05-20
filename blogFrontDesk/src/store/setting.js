import { setting } from "@/api";
import { titleController } from "@/utils";
// 全局设置存到vuex里
export default {
  namespaced: true,
  state: {
    isLoading: false,
    data: null,
    isShow: false,
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
    setIsShow(state, payload) {
      state.isShow = payload;
    },
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setIsLoading", true);
      const resp = await setting.getSetting();
      ctx.commit("setData", resp);
      ctx.commit("setIsLoading", false);
      if (resp.favicon !== null) {
        let link = document.querySelector('link[rel="shortcut icon"]');
        if (link) return;
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "images/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      resp.siteTitle && titleController.setSiteTitle(resp.siteTitle);
    },
  },
};
