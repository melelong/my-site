import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
// import { get } from "core-js/core/dict";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

//const whiteList = ["/login"]; // no redirect whitelist 白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // 进度条开始
  NProgress.start();

  // set page title 设置标题
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in 获取token
  // const hasToken = getToken();
  // 获取本地用户信息
  const hasGetUserInfo = store.getters.user;
  if (to.meta.auth) {
    // 跳转的页面需要鉴权
    if (!hasGetUserInfo) {
      // 没有用户信息
      // 获取token
      const hasToken = getToken();
      if (hasToken) {
        // 有token,还需要验证token的有效性
        try {
          await store.dispatch("user/getInfo");
          next();
        } catch (err) {
          // token失效，删除token并删除token，跳转到登录页
          await store.dispatch("user/resetToken");
          Message.error("登录过期，请重新登录");
          next(`/login?redirect=${to.path}`);
        }
      } else {
        // 没有token，要重新登录
        next(`/login?redirect=${to.path}`);
      }
    } else {
      // 放行
      next();
    }
    // 进度条结束
  } else {
    // 跳转的页面不需要鉴权
    if (to.path === "/login" && hasGetUserInfo) {
      // 登录状态下跳转到登录页面跳转到首页，否则放行
      next({ path: "/" });
    } else next();
    // 进度条结束
  }
  // 下方是vue-element-admin原来的鉴权流程
  // 判断是否有token
  // if (hasToken) {
  //   // 有token
  //   if (to.path === "/login") {
  //     // 要进入登录页
  //     // if is logged in, redirect to the home page
  //     // 放行
  //     next({ path: "/" });
  //     NProgress.done();
  //   } else {
  //     // 看一下是否有用户信息
  //     const hasGetUserInfo = store.getters.name;
  //     if (hasGetUserInfo) {
  //       // 有用户信息
  //       // 放行
  //       next();
  //     } else {
  //       // 没有用户信息
  //       try {
  //         // get user info
  //         // 用token尝试重新获取用户信息
  //         await store.dispatch("user/getInfo");

  //         next();
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         // token有问题，删除token
  //         await store.dispatch("user/resetToken");
  //         Message.error(error || "Has Error");
  //         // 重新跳转到登录页面
  //         next(`/login?redirect=${to.path}`);
  //         NProgress.done();
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   // 没有token
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next();
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`);
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
