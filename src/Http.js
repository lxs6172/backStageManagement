import axios from 'axios';
import router from './router';
import store from './store'
axios.interceptors.request.use(
    config => {
        // console.log("config",config)
        if (localStorage.token&&config.url!=='/api/login'&&config.url!=='/api/user/register') { //判断token是否存在
            config.headers.Authorization = localStorage.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log("response",response)
        if (response.data.retVal === 501) {
            router.replace('/');
            console.log("token过期");
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default axios;

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    console.log("store",store.state.user.token)
    console.log("localhost",localStorage.token)
    if(store.state.user.token){
        if (to.path === '/login') {
            next({ path: '/cloudproviders/infrastructure' })
        } else {
            next()
        }
    }else{
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      }
    }
});