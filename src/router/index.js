// 引入 路由
import {createRouter,createWebHashHistory} from 'vue-router'
import search from "../views/search/search.vue"
import details from "../views/search/details/index.vue"
import home from "../views/home.vue"

let router = createRouter({
   // url 地址的转发规则
   history: createWebHashHistory(),
   // 在routes 中配置路由规则
   routes:[
     {
       path:'/',
       component: () => import('../views/search/search.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: search
    },
    {
      path: '/details',
      name: 'details',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: details
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "login" */ '../views/signin/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: home
    },
 
   ]
  }
);

export default router;

