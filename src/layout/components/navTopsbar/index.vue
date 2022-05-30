<template>
  <el-menu-item v-if="!item.hidden && item.meta && item.path" :index="resolvePath(item.path)">
    <navItem :icon="item.meta && item.meta.icon" :title="item.meta.title" />
  </el-menu-item>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import NavItem from './NavItem'
import FixiOSBug from '../Sidebar/FixiOSBug'

export default {
  name: 'NavBarItem',
  components: { NavItem },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
