import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {title: 'ICE BBS'}
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
    //编辑
  {
    name: 'post-edit',
    path: '/post/edit/:id',
    component: () => import('../views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  //详情
  {
    name: 'post-detail',
    path: '/post/:id',
    component: () => import('../views/post/Detail'),
    meta: {title: '帖子详情'}
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('../views/Search'),
    meta: {title: '搜索'}
  },
  {
    name: 'user',
    path: '/user/:username/home',
    component: () => import('../views/user/Index'),
    meta: {title: '个人中心'}
  },
    //用户设置
  {
    name: 'user-setting',
    path: '/user/:username/setting',
    component: () => import('../views/user/Setting'),
    meta: {title: '设置'}
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
