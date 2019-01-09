import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(iview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
