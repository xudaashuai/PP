// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueSocketio from 'vue-socket.io';
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage);
Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost',store);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
