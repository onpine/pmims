import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Layout from "../views/layout.vue";
import Pmim from "../views/pmim.vue";
import Add from "../views/add.vue";

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
        redirect: "/pmim"
      },
      {
        path: "/pmim",
        name: "pmim",
        component: Pmim
      },
      {
        path: "/add",
        name: "add",
        component: Add
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
