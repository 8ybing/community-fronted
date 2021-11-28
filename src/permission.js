import router from "./router";
import store from "./store";
import './api/auth/auth'


import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from "./utils/auth";
import getPageTitle from "./utils/get-page-title";


NProgress.configure({showSpinner: false})

//
router.beforeEach(async (to,from,next) => {
    NProgress.start() //开启顶部nprogress进度条
    //设置网页标题
    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken();


    if(hasToken){
        if(to.path === '/login'){
            //如果已登录，再次访问登录页面自动跳转首页
            next({path: '/'})
            NProgress.done()
        }else{
            //每次跳转都实时获取用户信息
            await store.dispatch('user/getInfo')
            next()
        }
    }else{
        next()
    }
})

router.afterEach(() => {
    NProgress.done()
})