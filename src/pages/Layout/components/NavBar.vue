<template>
    <el-menu class="navbar" mode="horizontal">
        <div class="user-profile-container" trigger="click">
            <div class="user-profile-content">
                <div class="menu-icons">
                    <span class="menu-icon">
                        <el-badge :is-dot="false" class="item">
                            <i class="el-icon-bell icon"></i>
                        </el-badge>
                    </span>
                    <span class="menu-icon">
                        <el-badge :is-dot="false" class="item">
                            <i class="el-icon-document icon"></i>
                        </el-badge>
                    </span>
                    <span class="menu-icon">
                        <el-badge :is-dot='true' class="item">
                            <i class="el-icon-edit icon"></i>
                            </el-badge>
                    </span>
                </div>   
                <el-dropdown>
                    <div class="user-profile-body">
                        <img class="user-avatar" :src="image"/>
                        <!-- <span class="user-name">{{this.$store.state.user.userName.split('@')[0]}}</span> -->
                        <!-- <span class="user-name">张三</span> -->
                    </div>
                    <el-dropdown-menu class="user-dropdown" slot="dropdown">
                        <router-link to="/account/list">
                            <el-dropdown-item>我的账户</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item>
                            <span @click="logout" style="display:block;">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-menu>
</template>

<script>
    import headeimage from "@/assets/images/headeimage.png";
    export default {
        name: "NavBar",
        data() {
            return {
                Menus: "",
                name: "",
                image: headeimage,
            };
        },
        created() {
            console.log("store",this.$store.state)
            
        },
        methods: {
            // getname() {
            //     this.name = JSON.parse(localStorage.user).Name;
            //     if (JSON.parse(localStorage.user).WXUserInfo) {
            //         this.image ="data:image/png;base64," +JSON.parse(localStorage.user).WXUserInfo.Headimg;
            //         // this.name =JSON.parse(localStorage.user).WXUserInfo.Nickname
            //     } else {
            //         this.image =headeimage
            //     }
            // },
            logout() {
                // this.$http.get('/api/logout').then(res=>{
                //         // console.log("logout",res)
                //         if(res.status===200){
                //             localStorage.token = "";
                //             localStorage.menus = "";
                //             this.$router.push({
                //                 path: "/login"
                //             });
                //             // this.$store.commit('SET_TOKEN', '')
                //         }else{
                //             this.$message({
                //                 message:'登出失败',
                //                 icon:'error'
                //             })
                //         }
                // })
            },
            getTickets(){

            }
        }
    };
</script>

<style lang="scss" scoped>
    .navbar {
        height: 64px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        .user-profile-container {
            position: absolute;
            right: 20px;
            cursor: pointer;

            .user-profile-content {
                display: flex;
                padding: 20px 0;
            }

            .menu-icons {
                display: flex;
                align-items: center;

                .menu-icon {
                    padding: 0 12px;

                    .icon {
                        display: inline-block;
                        font-size: 18px;
                        text-align: center;
                    }
                }
            }

            .user-profile-body {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding-right: 14px;
            }

            .user-avatar {
                width: 24px;
                height: 24px;
                margin: 0 8px 0 12px;
                border-radius: 4px;
            }

            .user-name {
                color: rgba(0, 0, 0, 0.65);
            }

            .user-department {
                font-size: 12px;
                color: rgba(102, 102, 102, 0.65);
            }

            .el-icon-caret-bottom {
                position: absolute;
                right: 0;
                top: 13px;
                font-size: 12px;
            }
        }
    }
</style>
