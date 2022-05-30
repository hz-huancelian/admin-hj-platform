import request from '@/utils/request'

export function getRouteList() {
  return request({
    url: '/route',
    method: 'get'
  })
}

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: '/menu/selectMenuList',
    method: 'get',
    params: query
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/menu/insertMenu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/menu/updateMenu',
    method: 'post',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/menu/deleteMenuById/' + menuId,
    method: 'get'
  })
}

// // 查询菜单详细
// export function getMenu(menuId) {
//   return request({
//     url: '/system/menu/' + menuId,
//     method: 'get'
//   })
// }

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

