import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import additem from '@/components/addItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/additem',
      name: 'additem',
      component: additem
    }
  ]
})
