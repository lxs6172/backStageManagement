<template>
  <scroll-bar>
    <div class="logo" style="display:flex;">
      <span class="site-name" style="color:#000000;font-size:16px">后台管理</span>
    </div>
    <el-menu
            mode="vertical"
            :show-timeout="200"
            text-color="#000"
            :default-active="defaultActive"
            @select="selectMenu"
    >
      <template v-for="item in menus" >
        <template v-if="item.name!=='login'">
          <router-link v-if="!item.children" :to="item.path" :key="item.title">
            <el-menu-item :index="item.path"> 
              <span v-if="item.title" slot="title">{{item.title}}</span>
            </el-menu-item>
          </router-link>
          <el-submenu v-else :index="item.title || item.path" :key="item.title">
            <template slot="title">
              <span v-if="item && item.title" slot="title">{{item.title}}</span>
            </template>
            <template v-for="child in item.children">
              <router-link :to="child.path" :key="child.title">
                <el-menu-item :index="child.path">
                  <span v-if="child && child.title" slot="title">{{child.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import menu from "@/router/menu.js";
  import ScrollBar from "./ScrollBar";
  export default {
    name: 'AsideNav',
    components: {
      ScrollBar
    },
    data () {
      return {
        menus: [],
        menu,
        activerouter:''
      };
    },
    computed: {
      defaultActive(){
        return '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
      }
    },
    created() {
    
      this.menus=this.menu
      console.log('自定义this.menus',this.menu)
    },
    mounted() {
      // this.activerouter = this.$route.path;
      // console.log(this.activerouter)
    },
    methods: {
      selectMenu(index, indexPath) {
        // this.
      }
    }
  }
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  // background: #002140;
  background: #ffffff;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}

// .site-name {
//   // margin-left: 10px;
// }

.sidebar-container {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.28s;
  width: 160px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;


  a {
    display: inline-block;
    width: 100%;
  }

  .el-menu {
    width: 100% !important;
    border: none;
  }

  .el-submenu .el-menu-item {
    min-width: 160px !important;
    padding-left: 48px !important;
    /*background-color: #a71e32 !important;*/
    // #000c17
    &:hover {
      color: #188fff !important;
      background:#fff
    }
  }

  .el-menu-item,
  .el-submenu .el-menu-item {
    &.is-active {
      background-color: #188fff !important;
      color: #fff !important;
    }
  }

  .el-submenu__title i {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>
