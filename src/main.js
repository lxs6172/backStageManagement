import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
// import axios from "axios"
import '@/assets/css/reset.css'
import '@/assets/css/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from './Http';
Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.prototype.$http = axios;
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
