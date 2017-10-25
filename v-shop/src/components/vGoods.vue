<template>
    <Card class="goods" :padding="0"> 
        <div class="goods-box"> 
            <img src="../assets/00000000.jpg" />
            <p>限购型黑猫</p>
            <div class="goods-message">
                <p>￥&nbsp;<span>1000</span></p>
                <p>库存&nbsp;<span>1000</span></p>
            </div>
        </div>
        <div class="add-btn" title="加入购物车">
            <img src="../assets/plus.png" alt="加入购物车">
        </div>
    </Card>
</template>

<script>
export default {

}
</script>

<style scoped>
    .goods {
        cursor: pointer;
        font-size: 0.5em;
        color: #2b85e4;
        margin: 5px;
    }
    .goods-box {
        padding: 10px;
    }
    .goods-box img {
        width: 100%;
    }
    .goods-message {
        display: flex;
    }
    .goods-message>p {
        width: 50%;
    }
    .goods-message p span {
        font-weight: bold;
    }
    .goods-message>p:first-child {
        text-align: left;
    }
    .goods-message>p:last-child {
        text-align: right;
    }
    .goods .add-btn {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #dddee1;
        opacity: 0.6;
        z-index: 9;
        justify-content: center;
        align-items: center;
        display: none;
    }
    .goods:hover .add-btn {
        display: flex;
    }
</style>
