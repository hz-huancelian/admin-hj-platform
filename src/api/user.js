import request from '@/utils/request'
/** ********************系统操作***********************/
export function login(data) {
  return request({
    url: '/sys/login/doLoginByUsername',
    method: 'post',
    data
  })
}

// 用户个人信息获取
export function getInfo() {
  return request({
    url: `/sys/login/getUserInfo`,
    method: 'get'
  })
}

// 用户个人信息获取
export function doLogout() {
  return request({
    url: `/sys/login/doLogout`,
    method: 'post'
  })
}

// 用户个人密码重置
export function resetPersonPassword(data) {
  return request({
    url: `/sys/user/resetPassword`,
    method: 'post',
    data
  })
}

/** ********************用户管理***********************/
// 用户列表
export function getUserListForPage(params) {
  return request({
    url: `/sys/user/getByCondition`,
    method: 'get',
    params
  })
}

// 用户新增
export function addUserInfo(data) {
  return request({
    url: `/sys/user/save`,
    method: 'post',
    data
  })
}

// 用户修改
export function updUserInfo(data) {
  return request({
    url: `/sys/user/modifyUserById`,
    method: 'post',
    data
  })
}

// 管理员重置个人密码
export function resetUserPassword(userId) {
  return request({
    url: `/sys/user/resetPersonPassword/${userId}`,
    method: 'get'
  })
}
