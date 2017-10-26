<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="value" placeholder="请输入商品编码或名称..."></Input>
                <Button @click="goShoppingCart" type="primary" icon="ios-cart">购物车</Button>
            </div>
        </div>
        <Tabs type="card" @on-tab-remove="handleTabRemove">
            <TabPane label="默认" v-if="tab0"  class="goods-list-box">
                <Row>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                    <Col :xs="8" :sm="6" :md="4" :lg="4" >
                        <v-goods></v-goods>
                    </Col>
                </Row>
                <Page :total="100" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="价格" v-if="tab1" class="goods-list-box">标签二的内容</TabPane>
            <TabPane label="销量" v-if="tab2" class="goods-list-box">标签三的内容</TabPane>
            <TabPane label="库存" v-if="tab3" class="goods-list-box">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>

import vGoods from './vGoods'

export default {
    components: {
        vGoods,
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
        },
        goShoppingCart () {
            this.$router.push({
                path: '/shoppingCart'
            });
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
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>
