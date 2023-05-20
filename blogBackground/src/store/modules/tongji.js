import { getClientId } from "@/api/tongji";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    CLIENT_ID: null, // 存储登录后的用户信息
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80", // 头像信息
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  // 登录
  login({ commit }, userInfo) {
    // userInfo是提交的用户信息
    return new Promise((resolve, reject) => {
      userInfo.loginId = userInfo.loginId.trim();
      loginApi(userInfo)
        .then((res) => {
          const { data } = res;
          if (data) {
            commit("SET_USER", data);
            resolve();
          } else {
            reject(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  // 恢复登录状态
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送请求
      getInfo().then((res) => {
        if (typeof res === "string") {
          // 未登录或者token已经过期
          res = JSON.parse(res);
          res.code === 401 && reject(res.msg);
        } else {
          // token是Ok的，将用户信息放入仓库中
          commit("SET_USER", res.data);
          resolve();
        }
      });
    });
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
