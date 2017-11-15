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
      // 
    }
  },
  created: function () {
    // 本地存储数据库IdexedDB
    let _this = this;
    let vshopDB = null;
    // 当前时间
    let date = new Date();
    let nowTime = date.getTime();
    let year = date.getFullYear();
    let nowMonth = date.getMonth();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    function addZero(val) {
        if (val < 10) {
            val = '0' + val;
        } 
        return val;
    }
    let today = year + '-' + addZero(month) + '-' + addZero(day);
    // 打开IndexedDB数据库
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
          setTimeout(function () {
            // 检查商品保质期
            _this.$store.commit('checkGoodsDate');
          }, 0);
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
            today: today,
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
          setTimeout(function () {
            for (let i = 0, len = _this.$store.state.todo.todoList.length; i < len; i++) {
              if (_this.$store.state.todo.todoList[i].state === '待完成') {
                let timer = null;
                let content = _this.$store.state.todo.todoList[i].content;
                let time = _this.$store.state.todo.todoList[i].time;
                let planTime = new Date(_this.$store.state.todo.todoList[i].time).getTime();
                timer = setInterval(function () {
                  console.log(_this.$store.state.todo.todoList[i]);
                    let newTime = new Date().getTime();
                    if (planTime - newTime <= 0) {
                        _this.$store.commit('changeTodoState', time);
                        let vshopDB = null;
                        IndexedDB.openDB('vshopDB', 1, vshopDB, {
                            name: 'vshop',
                            key: 'name'
                        }, function (db) {
                            let vshopDB = db;
                            IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.todo]);
                        });
                        _this.$Notice.warning({ 
                            title: '待办事件提醒', 
                            desc: content,
                            duration: 0
                        });
                        clearInterval(timer);
                    }
                }, 1000);
              }
            }
          }, 0);
          // 启动定时器
        } else {
          let todo = {
            name: 'todo',
            todoList: []
          };
          IndexedDB.putData(vshopDB, 'vshop', [todo]);
        }
      });
    });
    
    // 删除IndexedDB数据库
    // IndexedDB.deleteDB('vshopDB');
  
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
