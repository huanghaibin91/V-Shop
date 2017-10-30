import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入组件
import vGoodsList from '../components/vGoodsList'
import vShoppingCart from '../components/vShoppingCart'
import vGoodsStorage from '../components/vGoodsStorage'
import vGoodsDetailList from '../components/vGoodsDetailList'
import vGoodsDetail from '../components/vGoodsDetail'
import vCashRegister from '../components/vCashRegister'
import vMessageList from '../components/vMessageList'
import vDataStatistics from '../components/vDataStatistics'
import vPersonList from '../components/vPersonList'
import vTodoList from '../components/vTodoList.vue'

export default new Router({
  routes: [
    {
      path: '/',
      component: vGoodsList
    },
    {
      path: '/shoppingCart',
      component: vShoppingCart
    },
    {
      path: '/goodsStorage',
      component: vGoodsStorage
    },
    {
      path: '/goodsDetailList',
      component: vGoodsDetailList
    },
    {
      path: '/goodsDetail',
      component: vGoodsDetail
    },
    {
      path: '/cashRegister',
      component: vCashRegister
    },
    {
      path: '/messageList',
      component: vMessageList
    },
    {
      path: '/dataStatistics',
      component: vDataStatistics
    },
    {
      path: '/personList',
      component: vPersonList
    },
    {
      path: '/todoList',
      component: vTodoList
    }
  ]
})
