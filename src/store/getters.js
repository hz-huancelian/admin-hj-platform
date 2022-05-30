const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  cacheSearchForm: state => state.tagsView.cacheSearchForm,

  token: state => state.user.token,
  userName: state => state.user.userName,

  hiredate: state => state.user.hiredate,
  permissions: state => state.user.permissions,

  userInfo: state => state.user.userInfo,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  local_routes: state => state.permission.localRoutes,
  basic_url: state => state.permission.localBasicUrl,
  errorLogs: state => state.errorLog.logs
}
export default getters
