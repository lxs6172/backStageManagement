import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 在此仅存放用户登录信息等公共数据。
// 为便于维护，各页面储存的数据最好存在相应模块内。如page1储存的数据，应储存在page1文件中
export default new Vuex.Store({
    state: {
        user:{
            userName:'admin@qq.com',
            token:localStorage.getItem('token') ? localStorage.getItem('token') : ''
        },
        userlist:[],
    },
    mutations: {
        setuser(state,token){
            state.user.token = token;
            localStorage.setItem('token', token);
            console.log("state.user",token);
        }
    },
    actions: {

    },
    getters: {
        
    },
    modules: {
        
    }
})
