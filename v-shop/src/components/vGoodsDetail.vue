<template>
    <div class="goods-detail">
        <h2>限购型黑猫</h2>
        <div class="goods-message">
            <div class="message-left">
                <img src="../assets/00000000.jpg" alt="">
            </div>
            <div class="message-right">
                <div class="goods-message-right">
                    <p>商品编码：<span>00000000</span></p>
                    <p>商品单价：<span>199</span>元</p>
                    <p>商品库存：<span>199</span>件</p>
                    <p>商品分类：<span>老婆</span></p>
                    <p>商品保质期：<span>2999-12-12</span></p>
                </div>
                <div>
                    <Button type="warning" icon="trash-b">删除</Button>
                    <Button type="primary" icon="settings">修改</Button>
                </div>
            </div>
        </div>
        <div>
            <h3>商品销售统计</h3> 
        </div>
        <div>
            <h3>商品操作历史记录</h3>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formTop: {
                input1: '',
                input2: '',
                input3: '',
                input5: '',
                input: ''
            }
        }
    }
}
</script>

<style scoped>
    .goods-detail {
        width: 60%;
        margin: 10px auto;
    }
    .goods-message {
        display: flex;
        align-items: center;
    }
    .goods-message>div {
        box-sizing: border-box;
        margin: 20px 0;
    }
    .message-left {
        width: 20%;
    }
    .message-left>img {
        width: 100%;
        height: 100%;
    }
    .message-right {
        width: 80%;
        font-size: 1.5em;
        padding: 20px;
    }
    .goods-message-right {
        display: flex;
        flex-wrap: wrap;
    }
    .goods-message-right>p {
        width: 50%;
    }
</style>
