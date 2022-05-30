/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemRoutes = {
  path: '/sysManage',
  component: Layout,
  redirect: '/sysManage/dictList',
  name: 'sysManage',
  meta: {
    title: '系统管理',
    icon: 'icon'
  },
  children: [
    {
      path: 'dictList',
      component: () => import('@/views/dict/index'),
      name: 'dictList',
      meta: { title: '字典列表', roles: ['admin', 'manager'] }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      name: 'menu',
      meta: { title: '菜单管理', roles: ['admin', 'manager'] }
    },
    // {
    //   path: 'templete',
    //   component: () => import('@/views/system/templete'),
    //   name: 'templete',
    //   meta: { title: '录入模板管理', roles: ['admin', 'manager'] }
    // },
    {
      path: 'attrList/:secdClassId',
      component: () => import('@/views/system/templete/attrList'),
      name: 'attrList',
      hidden: true,
      meta: { title: '属性列表', roles: ['admin', 'manager'] }
    }
  ]
}

export default systemRoutes
