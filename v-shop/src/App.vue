<template>
    <div id="app">
      <v-header></v-header>
      <div class="main">
        <v-aside></v-aside>
        <div class="mian-right">
          <router-view></router-view>
        </div>
      </div>
      <v-footer></v-footer>
    </div>
</template>

<script>

import vHeader from './components/vHeader'
import vAside from './components/vAside'
import vFooter from './components/vFooter'

import IndexedDB from './indexedDB/IndexedDB'

export default {
  name: 'app',
  components: {
    vHeader,
    vFooter,
    vAside,
  },
  mounted: function () {
    // 本地存储数据库IdexedDB
    var _this = this;
    var vshopDB = null;
    IndexedDB.openDB('vshopDB', 1, vshopDB, {
      name: 'vshop',
      key: 'name'
    }, function (db) {
      var vshopDB = db;
      IndexedDB.getData(vshopDB, 'vshop', 'users', function (result) {
        if (result) {
          
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'goods', function (result) {
        if (result) {
          
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'shoppingCart', function (result) {
        if (result) {
          
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'cashRegister', function (result) {
        if (result) {
          
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'messages', function (result) {
        if (result) {
          
        }
      });
    });
    
    // IndexedDB.deleteDB('vshopDB');
    
    // 检查商品保质期
    this.$store.commit('checkGoodsDate');
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
