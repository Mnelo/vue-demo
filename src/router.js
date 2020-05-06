import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import login from "./login";
import mainPage from "./mainPage";
import hello from "./components/hello";
import webWorker from "./components/webWorker";
import d3 from "./components/d3";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/mainPage",
    component: mainPage,
    children: [
      {
        path: "/mainPage/hello",
        component: hello,
      },
      {
        path: "/mainPage/web-worker",
        component: webWorker,
      },
      {
        path: "/mainPage/d3",
        component: d3,
      },
    ],
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

// 全局路由守卫，用于token验证跳转
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }

  let token = document.cookie.split("=")[1];

  if (token !== "1") {
    next("/login");
    return;
  }

  next();
});

export default router;
