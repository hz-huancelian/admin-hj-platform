import { constantRoutes } from '@/router'
import { getRouteList } from '@/api/menu'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routers) {
  const accessedRouters = routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = resolve => require(['@/views' + component + '.vue'], resolve)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRoutes(router.children)
    }
    return true
  })
  return accessedRouters
}

const state = {
  routes: [],
  localRoutes: [],
  localBasicUrl: '',
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
    // state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
  },
  SET_LOCAL_ROUTES: (state, { localRoutes, basicUrl }) => {
    state.localRoutes = localRoutes
    state.localBasicUrl = basicUrl
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      getRouteList().then(response => {
        const { result } = response
        const accessedRoutes = filterAsyncRoutes(result)
        const showRouter = constantRoutes.concat(accessedRoutes)
        commit('SET_ROUTES', showRouter)
        resolve(showRouter)
      }).catch(error => {
        resolve(error)
      })
    })
  },
  saveLeftRoute({ commit }, { localRoutes, basicUrl }) {
    commit('SET_LOCAL_ROUTES', { localRoutes, basicUrl })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
