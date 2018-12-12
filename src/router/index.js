import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index')
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: () => import('@/pages/login')
    },
    {
      path: '/admin',
      component: Layout,
      children: [
        {
          path: 'post/:id?',
          component: _ => import('@/pages/post')
        },
        {
          path: 'posts',
          component: _ => import('@/pages/posts')
        },
        {
          path: 'gathers',
          component: _ => import('@/pages/gathers')
        },
        {
          path: 'gather/:id?',
          component: _ => import('@/pages/gather')
        }
      ]
    }
  ]
})
