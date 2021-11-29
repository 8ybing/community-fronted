import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//buefy
import Buefy from "buefy";
import 'buefy/dist/buefy.css'
//elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/app.css'
//时间格式化
import format from 'date-fns/format'

import './permission'
import relativeTime from 'dayjs/plugin/relativeTime'
//国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs')

//相对时间插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
dayjs().locale('zh-cn').format()

//设置全局可以使用dayjs
Vue.prototype.dayjs = dayjs

Vue.filter('date',(date) => {
  return format(new Date(date),'yyyy-MM-dd')
})

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
