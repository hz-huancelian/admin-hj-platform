<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-title">
          <el-row>
            <el-col :span="24">
              <el-menu
                :default-active="defaultActiveIndex"
                :collapse-transition="false"
                class="navbar-top"
                mode="horizontal"
                :router="true"
                background-color="#2b2f3a"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
              >
                <navBarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
              </el-menu>
            </el-col>
          </el-row>
        </div>
        <div class="right-navbar">
          <template v-if="device!=='mobile'">
            <div class="right-menu-item" style="font-size: 14px;margin-right: 0px;">
              账号:<span style="color:red;margin-left:10px;">{{ userName }}</span>
            </div>
            <screenfull id="screenfull" class="right-menu-item hover-effect" />
          </template>
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img src="http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="user-avatar">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/pwdUpdate">
                <el-dropdown-item>密码修改</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display:block;" @click="logout">登 出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>

    <div class="navbar">
      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import NavBarItem from './navTopsbar'
import { constantRoutes } from '@/router'
import path from 'path'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    NavBarItem
  },
  data() {
    return {
      defaultActiveIndex: '/',
      showRoutes: []
    }
  },
  computed: {
    ...mapGetters([
      'userName',
      'local_routes',
      'basic_url',
      'sidebar',
      'avatar',
      'device'
    ]),
    routes() {
      debugger
      if (this.$store.state.user.userInfo.userType === '0') {
        // this.defaultActiveIndex = constantRoutes[0].path
        const allRoute = [...constantRoutes]
        allRoute.forEach(i => {
          if (!i.hidden && i.path !== '/' && this.defaultActiveIndex === '/') {
            this.defaultActiveIndex = i.path
          }
        })
        this.fetchNavData()
        return constantRoutes
      } else {
        return this.generateTree([...constantRoutes], '/', this.$store.state.user.userInfo.permissions)
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  watch: {
    '$route': function(to, from) { // 路由改变时执行
      // console.info("to.path:" + to.path);
      this.fetchNavData()
    }
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleSelect(index) {
      this.defaultActiveIndex = index
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      // 原始数据被修改 这里传入数据要深拷贝
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        if (checkedKeys && checkedKeys.includes(routePath)) {
          if (this.defaultActiveIndex && this.defaultActiveIndex === '/') {
            this.defaultActiveIndex = route.path
          }
          res.push(route)
        } else if (route.children && !this.checkRoute(route, res)) {
          if (this.checkTopPath(route.children, route.path, checkedKeys)) {
            if (this.defaultActiveIndex === '/') {
              this.defaultActiveIndex = route.path
            }
            res.push(route)
          }
        }
      }
      // console.log(this.defaultActiveIndex)
      this.fetchNavData()
      return res
    },
    checkRoute(route, result) {
      return result.some(i => i.path === route.path)
    },
    checkTopPath(routes, basePath = '/', checkedKeys) {
      var flag = false
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        if (checkedKeys && checkedKeys.includes(routePath)) {
          flag = true
          break
        }
      }
      return flag
    },
    fetchNavData() { // 初始化菜单激活项
      // this.$store.dispatch('permission/saveLeftRoute', {})
      const routers = this.$router.options.routes // 获取路由对象
      for (var i = 0; i < routers.length; i++) {
        const children = routers[i].children
        if (children && routers[i].path === this.defaultActiveIndex) {
          this.$store.dispatch('permission/saveLeftRoute', { localRoutes: children, basicUrl: this.defaultActiveIndex })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
      .span {
        color: #f56c6c;
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.right-navbar {
  float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #ffffff;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
      .span {
        color: #f56c6c;
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
}
</style>
