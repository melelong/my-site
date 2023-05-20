import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  // 404
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  // 控制台
  {
    path: "/",
    component: Layout,
    redirect: "/console",
    children: [
      {
        path: "/console",
        name: "Console",
        component: () => import("@/views/console/index"),
        meta: { title: "控制台", icon: "dashboard", auth: true },
      },
    ],
  },
  // 个人中心
  {
    path: "/admin",
    component: Layout,
    children: [
      {
        path: "/admin",
        name: "admin",
        hidden: true,
        component: () => import("@/views/admin/index"),
        meta: { title: "个人中心", icon: "el-icon-s-home", auth: true },
      },
    ],
  },
  {
    path: "/tongJi",
    component: Layout,
    children: [
      {
        path: "/tongJi",
        name: "tongJi",
        hidden: true,
        component: () => import("@/views/tongJi/index"),
        meta: { title: "统计设置", icon: "el-icon-s-home", auth: true },
      },
    ],
  },
  // 首页标语
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页标语", icon: "el-icon-s-home", auth: true },
      },
    ],
  },
  // 文章管理
  {
    path: "/blog",
    component: Layout,
    redirect: "/blog",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-document" },
    children: [
      {
        path: "/blogList",
        name: "BlogList",
        component: () => import("@/views/blogList/index"),
        meta: { title: "文章列表", icon: "el-icon-s-order", auth: true },
      },
      {
        path: "/blogType",
        name: "BlogType",
        component: () => import("@/views/blogType/index"),
        meta: { title: "文章分类", icon: "el-icon-menu", auth: true },
      },
      {
        path: "/addBlog",
        name: "AddBlog",
        component: () => import("@/views/addBlog/index"),
        meta: { title: "添加文章", icon: "el-icon-circle-plus", auth: true },
      },
      {
        path: "/editBlog/:id",
        name: "EditBlog",
        hidden: true,
        component: () => import("@/views/editBlog/index"),
        meta: {
          title: "修改文章",
          icon: "el-icon-circle-plus",
          auth: true,
        },
      },
    ],
  },
  // 项目管理
  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "/projectList",
        name: "ProjectList",
        component: () => import("@/views/projectList/index"),
        meta: { title: "项目列表", icon: "el-icon-notebook-1", auth: true },
      },
      {
        path: "/addProject",
        name: "AddProject",
        component: () => import("@/views/addProject/index"),
        meta: { title: "添加项目", icon: "el-icon-link", auth: true },
      },
    ],
  },
  // 导航管理
  // {
  //   path: "/navigation",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/navigation",
  //       name: "Navigation",
  //       component: () => import("@/views/navigation/index"),
  //       meta: { title: "导航管理", icon: "el-icon-collection-tag", auth: true },
  //     },
  //   ],
  // },
  // 评论管理
  {
    path: "/comment",
    component: Layout,
    children: [
      {
        path: "/comment",
        name: "Comment",
        component: () => import("@/views/comment/index"),
        meta: {
          title: "评论管理",
          icon: "el-icon-chat-line-round",
          auth: true,
        },
      },
    ],
  },
  // 留言板
  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "/message",
        name: "Message",
        component: () => import("@/views/message/index"),
        meta: { title: "留言板", icon: "el-icon-copy-document", auth: true },
      },
    ],
  },
  // 关于我
  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/about/index"),
        meta: {
          title: "关于我",
          icon: "el-icon-s-custom",
          auth: true,
        },
      },
    ],
  },
  // 设置
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "/setting",
        name: "Setting",
        component: () => import("@/views/setting/index"),
        meta: { title: "设置", icon: "el-icon-s-tools", auth: true },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
