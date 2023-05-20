export default {
  namespaced: true,
  state: {
    blogIsShow: false,
  },
  mutations: {
    setBlogIsShow(state, payload) {
      state.blogIsShow = payload;
    },
  },
};
