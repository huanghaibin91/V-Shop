<template>
    <header>
        <h5 class="logo">
            V-SHOP
        </h5>
        <div class="inform">
            <a class="cart" href="#">
                <Icon type="ios-cart"></Icon>
            </a>
            <a href="#">
                <Icon type="email"></Icon>
            </a>
            <a href="">
                <Icon type="android-notifications"></Icon>
            </a>
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
    .inform a {
        padding-right: 1em;
    }
</style>

