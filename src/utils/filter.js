import Vue from 'vue'
import * as dayjs from 'dayjs'
import { parseTime } from '@/utils'

Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('MoneyFormat', function(value) {
  if (!value) {
    return '0.00'
  }
  const intPartFormat = Number(value).toFixed(2) // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('WeightFormat', function(value) {
  if (!value) {
    return '0.000'
  }
  const intPartFormat = Number(value).toFixed(3) // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (!dataStr) {
    return ''
  }
  return dayjs(dataStr).format(pattern)
})

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (!dataStr) {
    return ''
  }
  return dayjs(dataStr).format(pattern)
})

Vue.filter('TimeFormat', function(dataStr, pattern = 'YYYY.MM.DD') {
  if (!dataStr) {
    return ''
  }
  return dayjs(dataStr).format(pattern)
})

Vue.filter('Time2Format', function(dataStr, pattern = '{y}年{m}月{d}日') {
  if (!dataStr) {
    return ''
  }
  return parseTime(dataStr, pattern)
})

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', function(value, vlength = 25) {
  if (!value) {
    return ''
  }
  console.log('vlength: ' + vlength)
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
})
