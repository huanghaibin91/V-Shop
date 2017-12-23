<template>
    <header class="header">
        <h5 class="logo">
            V-SHOP
        </h5>
        <div class="inform">
            <Badge :count="this.$store.state.shoppingCart.number" overflow-count="99">
                <router-link to="/shoppingCart" class="cart" href="#" title="购物车">
                    <Icon type="ios-cart"></Icon>
                </router-link>
            </Badge>
            <Badge @click.native="resetMessageNumber" :count="this.$store.state.messages.number" overflow-count="99">
                <router-link to="/messageList" href="#" title="消息通知">
                    <Icon type="email"></Icon>
                </router-link>
            </Badge>
            <a href="https://github.com/huanghaibin91/V-Shop" target="_black" title="关于项目">
                <Icon type="social-github"></Icon>
            </a>
        </div>
    </header>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () {
        return {
            
        }
    },
    methods: {
        // 重置消息通知
        resetMessageNumber () {
            this.$store.commit('resetMessageNumber');
            let _this = this;
            let vshopDB = null;
            IndexedDB.openDB('vshopDB', 1, vshopDB, {
                name: 'vshop',
                key: 'name'
            }, function (db) {
                let vshopDB = db;
                IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.messages]);
            });
        }
    }
}
</script>

<style>
    .header {
        min-width: 400px;
        height: 50px;
        background-color: #1c2438;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 2em;
    }
    .logo {
        color: #2d8cf0;
    }
    .logo, .inform {
        padding: 0 2em;
    }
    .inform>span {
        margin-right: 1em;
    }
    .header .ivu-badge-count {
        box-shadow: none;
    }
</style>

