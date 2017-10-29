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
      <!-- 弹窗 -->
      <!-- <v-login></v-login> -->
      <!-- <v-set-goods></v-set-goods> -->
      <!-- <v-add-person></v-add-person> -->
      <!-- <v-check-out></v-check-out> -->
    </div>
</template>

<script>

import vHeader from './components/vHeader'
import vAside from './components/vAside'
// import vSetGoods from './components/vSetGoods'
import vFooter from './components/vFooter'
// import vLogin from './components/vLogin'
// import vAddPerson from './components/vAddPerson'
// import vCheckOut from './components/vCheckOut'

export default {
  name: 'app',
  components: {
    vHeader,
    vFooter,
    vAside,
    // vSetGoods,
    // vLogin,
    // vAddPerson,
    // vCheckOut
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
