import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
configure({
  trickleSpeed: 20,
  showSpinner: false,
});
window.start = start;
window.done = done;
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
function getPageComponent(fn) {
  return async () => {
    start();
    process.env.NODE_ENV === "development" && (await delay(2000));
    const comp = await fn();
    done();
    return comp;
  };
}
// 导出路由匹配规则
export default [
  {
    name: "Home",
    path: "/",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'home' */ "@/views/Home")
    ),
    meta: {
      title: `首页`,
    },
  },
  {
    name: "Blog",
    path: "/article",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'blog' */ "@/views/Blog")
    ),
    meta: {
      title: `文章`,
    },
  },
  {
    name: "CategoryBlog",
    path: "/article/cate/:categoryId",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'categoryBlog' */ "@/views/Blog")
    ),
  },
  {
    name: "Detail",
    path: "/article/:id",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'detail' */ "@/views/Blog/Detail")
    ),
    meta: {
      title: `文章详情`,
    },
  },
  {
    name: "About",
    path: "/about",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'about' */ "@/views/About")
    ),
    meta: {
      title: `关于我`,
    },
  },
  {
    name: "Project",
    path: "/project",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'project' */ "@/views/Project")
    ),
    meta: {
      title: `项目&效果`,
    },
  },
  {
    name: "Message",
    path: "/message",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'message' */ "@/views/Message")
    ),
    meta: {
      title: `留言板`,
    },
  },
  {
    name: "Page404",
    path: "/page404",
    component: getPageComponent(() =>
      import(/* webpackChunkName: 'Page404' */ "@/views/Page404")
    ),
    meta: {
      title: `404页面`,
    },
  },
  {
    name: "notPage",
    path: "*",
    redirect: "/page404",
  },
];
