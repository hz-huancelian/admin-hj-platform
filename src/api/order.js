import request from '@/utils/request'

export function findPageByCondition(params) {
  return request({
    url: '/order/order/findPageByCondition',
    method: 'get',
    params
  })
}

export function getOrderProds(ordCode) {
  return request({
    url: `/order/order/${ordCode}/prods`,
    method: 'get'
  })
}

export function getOrderInfo(ordCode) {
  return request({
    url: `/order/order/${ordCode}/info`,
    method: 'get'
  })
}

export function saveOrder(data) {
  return request({
    url: `/order/order/save`,
    method: 'post',
    data
  })
}

export function saveProds(data) {
  return request({
    url: `/order/order/saveProds`,
    method: 'post',
    data
  })
}

export function submitApprove(ordCode) {
  return request({
    url: `/order/order/submitApprove/${ordCode}`,
    method: 'put'
  })
}

export function deleteOrder(ordCode) {
  return request({
    url: `/order/order/remove/${ordCode}`,
    method: 'delete'
  })
}

export function delItemById(orderItemId) {
  return request({
    url: `/order/order/delItemById/${orderItemId}`,
    method: 'get'
  })
}

export function updatePriceByIds(data) {
  return request({
    url: `/order/order/updatePriceByIds`,
    method: 'post',
    data
  })
}

