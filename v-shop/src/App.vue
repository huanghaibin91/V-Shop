<template>
    <div id="app">
      <v-header></v-header>
      <div class="main">
        <v-aside></v-aside>
        <div class="mian-right">
          <!-- <v-goods></v-goods> -->
          <!-- <v-search></v-search> -->
          <v-goods-list></v-goods-list>
          <!-- <v-set-goods></v-set-goods> -->
          <!-- <v-goods-detail></v-goods-detail> -->
          <!-- <v-goods-storage></v-goods-storage> -->
        </div>
      </div>
      <v-footer></v-footer>
      <v-login></v-login>
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
    vGoodsStorage,
    vLogin
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
  min-width: 700px;
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
}
</style>
