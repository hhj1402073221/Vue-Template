import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // 默认语言包是中文
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element, { locale })
Vue.config.productionTip = false

/**
 * 创建和挂载根实例。
 * 记得要通过 router 配置参数注入路由，
 * 从而让整个应用都有路由功能
 */

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
