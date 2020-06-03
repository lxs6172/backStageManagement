// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置


const headerMenuConfig = [];
const asideMenuConfig = [
    {
        CNName:"云化资源",
        icon:"el-icon-menu",
        Path:"/cloud",
        SubMenus:[
            {
                CNName:"虚拟主机",
                Path:"/list"
            },
            {
                CNName:"弹性ip",
                Path:"/resources"
            },
            {
                CNName:"镜像",
                Path:"/design"
            },
            {
                CNName:"块存储",
                Path:"/alerts"
            },
            {
                CNName:"虚拟网络",
                Path:"/audit"
            },
            {
                CNName:"安全组",
                Path:"/audit"
            }
        ]
    },
    // {
    //     CNName:"服务市场",
    //     icon:"el-icon-share",
    //     Path:"/marketplace",
    //     SubMenus:[
    //         {
    //             "CNName":"基础服务",
    //             "Path":"/catalog"
    //         },
    //         {
    //             "CNName":"镜像市场",
    //             "Path":"/image"
    //         },
    //         {
    //             "CNName":"API市场",
    //             "Path":"/api"
    //         },
    //         {
    //             "CNName":"我的订阅",
    //             "Path":"/subscribed"
    //         }
    //     ]
    // },
    // {
    //     CNName:"基础设施",
    //     icon:"el-icon-upload",
    //     Path:"/infrastructure",
    //     SubMenus:[
    //         {
    //             CNName:"资源地域",
    //             Path:"/regions"
    //         },
    //         {
    //             CNName:"硬件资源",
    //             Path:"/hardwares"
    //         },
    //         {
    //             CNName:"云化资源",
    //             Path:"/clouds"
    //         },
    //         {
    //             CNName:"容器平台",
    //             Path:"/docker"
    //         },{
    //             CNName:"操作审计",
    //             Path:"/audit"
    //         }
    //     ]
    // },
    // {
    //     CNName:"访问控制",
    //     icon:"el-icon-rank",
    //     Path:"/access",
    //     SubMenus:[
    //         {
    //             CNName:"资源地域",
    //             Path:"/regions"
    //         },
    //         {
    //             CNName:"硬件资源",
    //             Path:"/hardwares"
    //         },
    //         {
    //             CNName:"云化资源",
    //             Path:"/clouds"
    //         },
    //         {
    //             CNName:"容器平台",
    //             Path:"/docker"
    //         }
    //     ]
    // },
    // {
    //     CNName:"作业管理",
    //     icon:"el-icon-document",
    //     Path:"/job",
    //     SubMenus:[
    //         {
    //             CNName:"动作项",
    //             Path:"/action"
    //         },
    //         {
    //             CNName:"作业编排",
    //             Path:"/taskdefine"
    //         },
    //         {
    //             CNName:"过程计算",
    //             Path:"/lambdalist"
    //         },
    //         {
    //             CNName:"执行中心",
    //             Path:"/execution"
    //         }
    //     ]
    // },
    // {
    //     Path: '/account',
    //     CNName: '我的账户',
    //     icon: 'el-icon-setting',
    //     SubMenus: [
    //         {
    //             Path: '/subaccount',
    //             CNName: '我的子账户',
    //         },
    //         {
    //             Path: '/ticket',
    //             CNName: '我的审批',
    //         },
    //         {
    //             Path: '/role',
    //             CNName: '角色管理',
    //         },
    //         {
    //             Path: '/list',
    //             CNName: '账号信息',
    //         },
    //     ],
    // },
];

export { headerMenuConfig, asideMenuConfig };
