<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import path from 'path'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'local_routes',
      'basic_url',
      'sidebar'
    ]),
    routes() {
      // return this.$router.options.routes;
      if (this.$store.state.user.userInfo.userType === '0') {
        debugger
        return this.local_routes
      } else {
        return this.generateTree([...this.local_routes], '/', this.$store.state.user.userInfo.permissions)
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
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    generateTree(routes, basePath = '/', checkedKeys) {
      // 原始数据被修改 这里传入数据要深拷贝
      const res = []
      for (const route of routes) {
        // const routePath = path.resolve(basePath, route.path)
        const routePath = path.resolve(this.basic_url, route.path)
        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          )
        }
        if (checkedKeys && checkedKeys.includes(routePath)) {
          res.push(route)
        }
      }
      return res
    }
  }
}
</script>
