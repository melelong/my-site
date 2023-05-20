import { loginApi, getInfo, updateRefreshToken, setTongJi } from "@/api/user";
import {
  removeToken,
  removeRefresh,
  setRefresh,
  setAccess,
  removeAccess,
} from "@/utils/auth";
import { resetRouter } from "@/router";
import { Message } from "element-ui";

const getDefaultState = () => {
  return {
    user: null, // 存储登录后的用户信息
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
  login({ commit, dispatch, state }, userInfo) {
    // userInfo是提交的用户信息
    return new Promise((resolve, reject) => {
      userInfo.loginId = userInfo.loginId.trim();
      loginApi(userInfo)
        .then(async (res) => {
          if (res.data) {
            const { refresh_token, SecretKey, APIKey, ...userInfo } = res.data;
            commit("SET_USER", userInfo);
            if (
              refresh_token &&
              SecretKey &&
              APIKey &&
              userInfo.tongJi === "开启"
            ) {
              try {
                const res = await updateRefreshToken({
                  refresh_token,
                  APIKey,
                  SecretKey,
                });
                await setTongJi({
                  access_token: res.access_token,
                  refresh_token: res.refresh_token,
                });
                setRefresh(res.refresh_token);
                setAccess(res.access_token);
                Message.success("已配置百度统计");
              } catch (err) {
                Message.error("请重新配置统计");
              }
            } else {
              Message.warning("未配置百度统计");
            }
            resolve();
          } else {
            reject(res);
          }
        })
        .catch((err) => reject(err));
    });
  },

  // 恢复登录状态
  getInfo({ commit, dispatch, state }) {
    return new Promise(async (resolve, reject) => {
      // 发送请求
      getInfo().then(async (res) => {
        if (typeof res === "string") {
          // 未登录或者token已经过期
          res = JSON.parse(res);
          res.code === 401 && reject(res.msg);
        } else {
          // token是Ok的，将用户信息放入仓库中
          const userInfo = res.data;
          commit("SET_USER", userInfo);
          resolve();
        }
      });
    });
  },
  // 更新ACCESS_TOKEN
  refreshToken({ commit, state }, tokenInfo) {
    return new Promise((resolve, reject) => {
      const fn = updateRefreshToken(tokenInfo);
      fn.then((res) => {
        console.log(res);
        resolve();
      });
      fn.catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      removeRefresh();
      removeAccess();
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      removeRefresh();
      removeAccess();
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
