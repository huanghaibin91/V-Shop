<template>
    <Card class="goods" :padding="0" style="width:240px"> 
        <div class="goods-box"> 
            <img src="../assets/00000000.jpg" />
            <p>限购型黑猫</p>
            <div class="goods-message">
                <p>￥&nbsp;<span>1000</span></p>
                <p>库存&nbsp;<span>1000</span></p>
            </div>
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
        color: #2b85e4;
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
</style>
