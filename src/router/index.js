import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import FrontLayout from '@/pages/front/layout'

// import store from '@/store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index')
    },
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: 'posts',
          component: _ => import('@/pages/front/posts')
        }
      ]
    },
    {
      path: '/blog',
      name: 'Blog',
      component: _ => import('@/pages/blog'),
      children: [
        {
          path: 'posts',
          component: _ => import('@/pages/blog/post-list')
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: () => import('@/pages/login')
    },
    {
      path: '/admin',
      component: Layout,
      redirect: '/admin/login',
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
        },
        {
          path: 'says',
          component: _ => import('@/pages/says')
        },
        {
          path: 'say/:id?',
          component: _ => import('@/pages/say')
        },
        {
          path: 'qn',
          component: _ => import('@/pages/qn')
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (!to.meta.noAuth && !store.state.token) {
//     router.push({name: 'Login'})
//   }
//   document.title = to.meta.title
//   next()
// })

export default router
