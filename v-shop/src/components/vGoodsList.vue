<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="value" placeholder="请输入商品编码或名称..."></Input>
                <Button type="primary" icon="ios-cart">购物车</Button>
            </div>
        </div>
        <Tabs type="card" @on-tab-remove="handleTabRemove">
            <TabPane label="默认" v-if="tab0">标签一的内容</TabPane>
            <TabPane label="价格" v-if="tab1">标签二的内容</TabPane>
            <TabPane label="销量" v-if="tab2">标签三的内容</TabPane>
            <TabPane label="库存" v-if="tab3">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>

import vSearch from './vSearch'

export default {
    components: {
        vSearch
    },
    data () {
            return {
                value: '',
                tab0: true,
                tab1: true,
                tab2: true,
                tab3: true
            }
        },
        methods: {
            handleTabRemove (name) {
                this['tab' + name] = false;
            }
        }
}
</script>

<style scoped>
    .search-box {
        padding: 10px;
    }
    .search-input {
        display: flex;
        justify-content: center;
    }
    .search-input>div {
        max-width: 500px;
        min-width: 250px;
        padding-right: 15px;
    }
</style>
