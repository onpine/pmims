import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Layout from "../views/layout.vue";
import Pmim from "../views/pmim.vue";
import Add from "../views/add.vue";
import Fee from '../views/fee.vue'
import Activity from '../views/activity.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Layout,
    children: [
      //党员管理
      {
        path: "/",
        component: Pmim,
        redirect: "/pmim",
        meta: {
          title: '党员管理系统'
        }
      },
      {
        path: "/pmim/:branch",
        name: "pmim",
        component: Pmim,
        meta: {
          title: '党员管理系统'
        },
        props: true
      },
      {
        path: "/add",
        name: "add",
        component: Add,
        meta: {
          title: '党员管理系统'
        }
      },
      {
        path: "/fee",
        name: "fee",
        component: Fee,
        meta: {
          title: '党员管理系统'
        }
      }, {
        path: 'activity',
        name: 'activity',
        component: Activity,
        meta: {
          title: '党员管理系统'
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: '注册'
    }
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登陆状态
  // 如果没有登录，则跳转到登陆页面
  // 如果登陆了，则允许通过
  // 是 /login 允许通过
  const token = window.localStorage.getItem('token');
  // 校验非登录页面的登陆状态
  if (to.path !== '/login' && to.path !== '/register') {
    if (token) {
      next()
    } else {
      // 没有登陆，跳转到登陆页面
      next('/login')
    }
  } else {
    // 登陆页面。允许通过
    next()
  }
})
router.afterEach(function (to, from) {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;
