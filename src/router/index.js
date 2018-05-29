import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import additem from '@/components/addItem'
import addUser from '@/components/addUser'
import order from '@/components/order'
import historyOrder from '@/components/historyOrder'
import login from '@/components/login'
import addstock from '@/components/addStock'
import editgame from '@/components/editGame'
import edituser from '@/components/editUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/edituser',
      name: 'edituser',
      component: edituser
    },
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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/historyOrder',
      name: 'historyOrder',
      component: historyOrder
    },
    {
      path: '/addstock',
      name: 'addstock',
      component: addstock
    },
    {
      path: '/editgame',
      name: 'editgame',
      component: editgame
    }
  ]
})
