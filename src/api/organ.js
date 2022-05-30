import request from '@/utils/request'

// 机构列表信息
export function findPageByCondition(params) {
  return request({
    url: `/organ/findOrgansByCondition`,
    method: 'get',
    params
  })
}

// 查询部门列表信息
export function registOrigan(data) {
  return request({
    url: `/organ/registOrgan`,
    method: 'post',
    data
  })
}
