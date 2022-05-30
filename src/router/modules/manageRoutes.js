
import Layout from '@/layout'
const orderRoutes = {
  path: '/order',
  component: Layout,
  redirect: '/order/organList',
  name: 'order',
  meta: {
    title: '机构管理',
    icon: 'documentation'
  },
  children: [
    {
      path: 'organList',
      component: () => import('@/views/organ/index'),
      name: 'organList',
      meta: { title: '机构列表' }
    }
  ]
}

export default orderRoutes
