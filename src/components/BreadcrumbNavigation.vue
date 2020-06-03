<template>
    <el-breadcrumb class="breadcrumb-nav" separator-class="el-icon-arrow-right">
        <template v-for="item in this.breadcrumbNavList">
            <el-breadcrumb-item class="breadcrumb-item" :to="{ path: item.path, query: item.query }">{{item.title}}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
    import menu from "@/router/index.js"
    export default {
        name: "BreadcrumbNavigation",
        data() {
            return {
                breadcrumbNavList: [
                ]
            }
        },
        created() {
            let arr = this.$route.fullPath.split('/');
            arr.shift();
            arr.forEach((val,index,arr) => {
                if (index === 0) {
                    this.breadcrumbNavList.push({
                        path: ("/" + val).split("?")[0],
                        title: menu.options.routes.find(item => item.path === "/" + val).title,
                        query: this.handleQuery(("/" + val).split("?")[1])
                    })
                } else {
                    this.breadcrumbNavList.push({
                        path: (this.breadcrumbNavList[index - 1].path + '/' + val).split("?")[0],
                        title: menu.options.routes.find(item => item.path === (this.breadcrumbNavList[index - 1].path + '/' + val).split("?")[0]).title,
                        query: this.handleQuery((this.breadcrumbNavList[index - 1].path + '/' + val).split("?")[1]),
                    })
                }
            });
            this.breadcrumbNavList.shift()
        },
        methods: {
            handleQuery(query) {
                const params = new URLSearchParams(query);
                const obj = {};
                for (let p of params.entries()) {
                    obj[p[0]] = p[1];
                }
                return obj;
            }
        }
    }
</script>

<style scoped>
.breadcrumb-nav {
    flex: 1;
    line-height: 32px;
}
.breadcrumb-item > span {

}
</style>