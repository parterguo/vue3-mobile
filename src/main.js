import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import Mock from '@/mock'
import { Toast } from 'vant';
import 'lemon-imui/dist/index.css';
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import vConsole from './utlis/vconsole'
 const  app= createApp(App)
 app.use(router)
 app.use(Mock)
//  app.use(vConsole)
 import * as echarts from 'echarts'
 app.config.globalProperties.$echarts = echarts
 app.use(Vant)
 app.use(Toast)
 app.use(NProgress)
 app.mount('#app')

 router.beforeEach((to, from, next) => {
    NProgress.start() // 进度条开始
    next()
  })
  
  router.afterEach(() => {
    NProgress.done() // 进度条结束
  })
//   // 进度条的配置项：ease可以设置css3动画，如ease，linear；speed是进度条从开始到结束的耗时
//   NProgress.configure({ease:'linear',speed: 500});