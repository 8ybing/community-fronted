import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register'),
    meta: {title: '注册'}
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/auth/Login'),
    meta: {title: '登录'}
  },
  {
    name: 'post-create',
    path: '/post/create',
    component: () => import('@/views/post/Create'),
    meta: {title: '信息发布', requireAuth: true}
  },
  {
    name: 'post-detail',
    path: '/post/:id',
    component: () => import('../views/post/Detail'),
    meta: {title: '帖子详情'}
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    meta: {title: '404-NotFound'}
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

//给VueRouter重写了push功能，将异常不再抛出
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this,location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
