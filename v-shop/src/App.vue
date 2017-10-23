<template>
    <div id="app">
      <v-header></v-header>
      <div class="main">
        <v-aside></v-aside>
        <div class="mian-right">
          <!-- <v-search></v-search> -->
          <!-- <v-goods-list></v-goods-list> -->
          <v-goods-detail></v-goods-detail>
          <!-- <v-goods-detail-list></v-goods-detail-list> -->
          <!-- <v-goods-storage></v-goods-storage> -->
          <!-- <v-person-list></v-person-list> -->
        </div>
      </div>
      <v-footer></v-footer>
      <!-- 弹窗 -->
      <v-login></v-login>
      <v-set-goods></v-set-goods>
    </div>
</template>

<script>

import vHeader from './components/vHeader'
import vAside from './components/vAside'
import vGoods from './components/vGoods'
import vSearch from './components/vSearch'
import vGoodsList from './components/vGoodsList'
import vSetGoods from './components/vSetGoods'
import vGoodsDetail from './components/vGoodsDetail'
import vGoodsStorage from './components/vGoodsStorage'
import vFooter from './components/vFooter'
import vLogin from './components/vLogin'
import vGoodsDetailList from './components/vGoodsDetailList'
import vPersonList from './components/vPersonList'

export default {
  name: 'app',
  components: {
    vHeader,
    vFooter,
    vAside,
    vGoods,
    vSearch,
    vGoodsList,
    vSetGoods,
    vGoodsDetail,
    vGoodsDetailList,
    vGoodsStorage,
    vLogin,
    vPersonList
  },
  data () {
    return {
      value: [20, 50]
    }
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  min-width: 992px;
}
.main {
  height: calc(100% - 80px);
  display: flex;
}
.mian-right {
  width: calc(100% - 200px);
  height: 100%;
  background-color: #f8f8f9;
  padding: 0 10px;
  overflow-y: scroll;
}
</style>
