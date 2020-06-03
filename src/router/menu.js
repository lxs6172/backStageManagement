// 菜单路由
import Layout from '@/pages/Layout/Layout.vue'
import Login from "@/pages/Login/Login.vue"


export default [
    {
        path:'/login',
        name:'login',
        layout:Login,
    },
    {
        path: '/',
        layout:Login,
        redirect: "/b",
        name: "login",
        hidden: true
    },
    {
        path: '/account',
        layout: Layout,
        title: '用户管理',
        children:[
            {
                path: '/account/accountlist',
                layout: Layout,
                title: '用户列表',
                component: () => import('../pages/Account/Account.vue'),
            },
            // {
            //     path: '/account/organizationlist',
            //     layout: Layout,
            //     title: '组织列表',
            //     component: () => import('../pages/Account/Organization.vue'),
            // },
            // {
            //     path: '/account/permissions',
            //     layout: Layout,
            //     title: '菜单管理',
            //     component: () => import('../pages/Account/Permissions.vue'),
            // },
            // {
            //     path: '/account/role',
            //     layout: Layout,
            //     title: '角色管理',
            //     component: () => import('../pages/Account/Role.vue'),
            // },
        ]
    },{
        path: '/diagram',
        layout: Layout,
        title: '图表展示',
        children:[
            {
                path: '/diagram/d3show',
                layout: Layout,
                title: '折线图',
                component: () => import('../pages/Diagram/Diagram.vue'),
            },
            {
                path: '/diagram/histogram',
                layout: Layout,
                title: '柱状图',
                component: () => import('../pages/Diagram/Histogram.vue'),
            },
        ]   
    }
]


