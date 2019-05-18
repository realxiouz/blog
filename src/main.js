import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.scss'

import store from './store'

import Echo from 'laravel-echo'
window.io = require('socket.io-client')

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://192.168.28.128:6001',
    // host: window.location.hostname + ':6001'
    auth: {
      headers:
        {
          'authorization': 'Bearer ' + store.state.user ? store.state.user.api_token : ''
        }
    }
})

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
