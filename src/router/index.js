import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import additem from '@/components/addItem'
import addUser from '@/components/addUser'
import order from '@/components/order'
<<<<<<< HEAD
import historyOrder from '@/components/historyOrder'
=======
import login from '@/components/login'
>>>>>>> cfb482a3e862fc802ccbb615bb6a4fb2e901686f

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
    },
    {
      path: '/adduser',
      name: 'addUser',
      component: addUser
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
<<<<<<< HEAD
      path: '/historyOrder',
      name: 'historyOrder',
      component: historyOrder
=======
      path: '/login',
      name: 'login',
      component: login
>>>>>>> cfb482a3e862fc802ccbb615bb6a4fb2e901686f
    }
  ]
})
