<template>
    <header>
        <h5 class="logo">
            V-SHOP
        </h5>
        <div class="inform">
            <Badge count="0">
                <a class="cart" href="#" title="购物车">
                    <Icon type="ios-cart"></Icon>
                </a>
            </Badge>
            <Badge count="3">
                <a href="#" title="消息通知">
                    <Icon type="email"></Icon>
                </a>
            </Badge>
            <Badge count="3">
                <a href="" title="待办提醒">
                    <Icon type="android-notifications"></Icon>
                </a>
            </Badge>
        </div>
    </header>
</template>

<script>
    
</script>

<style scoped>
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

