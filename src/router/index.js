import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import iView from 'iview';
import Main from '@/components/Main'
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/index',
      name: 'Main',
      component: Main
    },
  ]
})
