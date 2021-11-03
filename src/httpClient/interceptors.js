import axios from "axios";
import router from  "../router/index"
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : ''
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios 配置
axios.defaults.timeout = 5000;
// http request 拦截器
var token=sessionStorage.getItem('token')
axios.interceptors.request.use(
  config => {
    if (token=='') {
      router.push({ path: '/login' })
     
    }else{
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
   
    return Promise.reject(err);
  });
 
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          router.push({ path: '/login' })
      }
    }
    return Promise.reject(error.response.data)
  });


export default axios;
