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

// 引入IndexedDB
import IndexedDB from './indexedDB/IndexedDB'

export default {
  name: 'app',
  components: {
    vHeader,
    vFooter,
    vAside,
  },
  data () {
    return {

    }
  },
  mounted: function () {
    // 本地存储数据库IdexedDB
    let _this = this;
    let vshopDB = null;
    IndexedDB.openDB('vshopDB', 1, vshopDB, {
      name: 'vshop',
      key: 'name'
    }, function (db) {
      let vshopDB = db;
      IndexedDB.getData(vshopDB, 'vshop', 'users', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'users';
          data.result = result;
          _this.$store.commit('getData', data);
        } else {
          let users =  {
            name: 'users',
            userList: [
              {
                  name: 'Admin',
                  coding: '000',
                  position: '管理员',
                  password: 'admin',
                  jurisdiction: '一级',
                  telephone: '###########',
                  address: '############',
                  avatar: 'http://img.qq1234.org/uploads/allimg/150128/20123A027-5.jpg'
              }
            ]
          };
          IndexedDB.putData(vshopDB, 'vshop', [users]);
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'goods', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'goods';
          data.result = result;
          _this.$store.commit('getData', data);
        } else {
          let goods = {
            name: 'goods',
            detailGoods: {},
            goodsList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [goods]);
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'shoppingCart', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'shoppingCart';
          data.result = result;
          _this.$store.commit('getData', data);
        } else {
          let shoppingCart = {
            name: 'shoppingCart',
            number: 0,
            shoppingCartList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [shoppingCart]);
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'cashRegister', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'cashRegister';
          data.result = result;
          _this.$store.commit('getData', data);
        } else {
          let cashRegister = {
            name: 'cashRegister',
            year: '2017',
            month: 10,
            name: 'cashRegister',
            cashRegisterList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [cashRegister]);
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'messages', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'messages';
          data.result = result;
          _this.$store.commit('getData', data);
        } else {
          let messages = {
            name: 'messages',
            today: '2017-11-08',
            name: 'messages',
            number: 0,
            limitDate: 30,
            limitNumber: 3,
            messageList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [messages]);
        }
      });
      IndexedDB.getData(vshopDB, 'vshop', 'todo', function (result) {
        if (result) {
          let data = new Object();
          data.name = 'todo';
          data.result = result;
          _this.$store.commit('getData', data);
        } else {
          let todo = {
            name: 'todo',
            todoList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [todo]);
        }
      });
    });
    
    // IndexedDB.deleteDB('vshopDB');
    
    // 检查商品保质期
    this.$store.commit('checkGoodsDate');
  },
  beforeDestroy () {
    let _this = this;
    let vshopDB = null;
    IndexedDB.openDB('vshopDB', 1, vshopDB, {
        name: 'vshop',
        key: 'name'
    }, function (db) {
        let vshopDB = db;
        IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.users]);
    });
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
