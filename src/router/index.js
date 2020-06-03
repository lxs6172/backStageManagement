import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入左侧菜单

import menu from './menu'

Vue.use(VueRouter)

const routerConfig = [...menu]
const routerMap = [];
const recursiveRouterConfig = (config = []) => {
    config.forEach((item) => {
        const route = {
            path: item.path,
            component: item.layout,
            name:item.name,
            title: item.title,
            children: [
                {
                    path: '',
                    component: item.component,
                    name:item.name,
                },
            ],
        };

        if (Array.isArray(item.children)) {
            recursiveRouterConfig(item.children);
        }
        routerMap.push(route);
    });

    return routerMap;
};
const routes = recursiveRouterConfig(routerConfig);
// console.log(routes)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
    mode:'history',
    routes,
  });
