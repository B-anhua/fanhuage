import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Goods from "../components/Goods.vue";
import Member from "../components/Member.vue";
import Order from "../components/Order.vue";
import index from "../components/index.vue";
import AddGoods from "../components/AddGoods.vue";
import AddMember from "../components/AddMember.vue"
import AddOrder from "../components/AddOrder.vue"
const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/index",
        name: "index", //主页
        component: index,
      },
      {
        path: "/Goods",
        name: "Goods", //商品管理
        component: Goods,
      },
      {
        path: "/AddGoods",
        name: "AddGoods", //添加商品
        component: AddGoods,
      },


      {
        path: "/Member",
        name: "Member", //会员管理
        component: Member,
      },
      {
        path: "/AddMember",
        name: "AddMember", //添加会员
        component: AddMember,
      },

      {
        path: "/Order",
        name: "Order", //订单管理
        component: Order,
      },
      {
        path: "/AddOrder",
        name: "AddOrder", //商品管理
        component: AddOrder,
      },
    ],
  },
  {
    path: "/",
    name: "Login",
    // component:()=>import('../components/Login.vue')
    component: Login,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
