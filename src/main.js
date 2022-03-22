import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'normalize.css'
import './css/main.scss'
import 'element-theme-dark'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import VueClipboard from 'vue-clipboard2'

const socket = io('http://103.253.146.189:5000/')
// const socket = io('http://localhost:5000/')

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(VueSocketIOExt, socket)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
