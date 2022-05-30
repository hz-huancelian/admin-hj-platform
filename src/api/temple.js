import request from '@/utils/request'
/** ********************系统操作***********************/
export function findPageByCondition(params) {
  return request({
    url: '/platform/dpc/findPageByCondition',
    method: 'get',
    params
  })
}

// 模板属性删除
export function templeDelById(id) {
  return request({
    url: `/platform/dpc/deleteById/${id}`,
    method: 'delete'
  })
}

// 模板内容调整
export function templeAdd(data) {
  return request({
    url: '/platform/dpc/add',
    method: 'post',
    data
  })
}

// 查询所有二级分类
export function getAllFactorSecdClass() {
  return request({
    url: '/platform/dpc/getAllFactorSecdClass',
    method: 'get'
  })
}

// 查询所有二级分类
export function getListBySecdClassId(secdClassId) {
  return request({
    url: `/platform/dpc/getListBySecdClassId/${secdClassId}`,
    method: 'get'
  })
}

