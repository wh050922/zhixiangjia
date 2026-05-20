import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index/index.vue'),
    meta: { title: '植享家' }
  },
  {
    path: '/wiki',
    name: 'wiki',
    component: () => import('@/pages/wiki/index.vue'),
    meta: { title: '植物百科' }
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('@/pages/ai/index.vue'),
    meta: { title: 'AI识花' }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/pages/shop/index.vue'),
    meta: { title: '助农商城' }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/pages/user/index.vue'),
    meta: { title: '我的' }
  },
  {
    path: '/space',
    name: 'space',
    component: () => import('@/pages/space/index.vue'),
    meta: { title: '空间智能匹配' }
  },
  {
    path: '/plants',
    name: 'plants',
    component: () => import('@/pages/plants/index.vue'),
    meta: { title: '我的植物' }
  },
  {
    path: '/balcony',
    name: 'balcony',
    component: () => import('@/pages/balcony/index.vue'),
    meta: { title: '阳台种菜' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || '植享家'
})

export default router
