<template>
    <header>
        <h5 class="logo">
            V-SHOP
        </h5>
        <div class="inform">
            <Badge count="1">
                <router-link to="/shoppingCart" class="cart" href="#" title="购物车">
                    <Icon type="ios-cart"></Icon>
                </router-link>
            </Badge>
            <Badge count="3">
                <router-link to="/messageList" href="#" title="消息通知">
                    <Icon type="email"></Icon>
                </router-link>
            </Badge>
            <Badge count="3">
                <router-link to="/todoList" href="" title="待办提醒">
                    <Icon type="android-notifications"></Icon>
                </router-link>
            </Badge>
            <a href="https://github.com/huanghaibin91/V-Shop" target="_black" title="关于项目">
                <Icon type="social-github"></Icon>
            </a>
        </div>
    </header>
</template>

<script>
    export default {
        
    }
</script>

<style>
    header {
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
    .ivu-badge-count {
        box-shadow: none;
    }
</style>

