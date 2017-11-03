<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="value" placeholder="请输入商品编码或名称..."></Input>
                <Button @click="goShoppingCart" type="primary" icon="ios-cart">购物车</Button>
            </div>
        </div>
        <Tabs type="card" @on-click="changeTab">
            <TabPane label="默认" v-if="defaultTab"  class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>限购型黑猫</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page v-if="pageFlag" :total="pageTotal" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="价格" v-if="priceTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>限购型黑猫</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page v-if="pageFlag" :total="pageTotal" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="销量" v-if="priceTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>限购型黑猫</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page v-if="pageFlag" :total="pageTotal" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="库存" v-if="numberTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>限购型黑猫</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page v-if="pageFlag" :total="pageTotal" show-elevator class="page"></Page>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

export default {
    data () {
        return {
            value: '',
            allGoodsList: this.$store.state.goods.goodsList,
            goodsList: this.$store.state.goods.goodsList,
            // priceGoodsList: this.$store.state.goods.goodsList,
            // goodsList: this.$store.state.goods.goodsList,
            // goodsList: this.$store.state.goods.goodsList,
            defaultTab: true,
            priceTab: true,
            salesTab: true,
            numberTab: true,
            pageFlag: true
        }
    },
    watch: {
        value: function (val) {
            this.goodsList = this.allGoodsList.filter(function (goods) {
                if (goods.name.includes(val) || goods.coding.includes(val)) {
                    return goods;
                }  
            });
        }
    },
    computed: {
        pageTotal: function () {
            let page = Math.ceil(this.goodsList / 24);
            if (page > 1) {
                this.pageFlag = true;
            } else {
                this.pageFlag = false;
            }
            return page;
        }
    },
    methods: {
        changeTab (name) {
            switch(name) {
                case 0:
                    this.goodsList = this.$store.state.goods.goodsList;
                    break;
                case 1:
                    this.goodsList = this.goodsList.sort(function (a, b) {
                        return b.price - a.price;
                    });
                    break;
                case 2:
                    this.goodsList = this.goodsList.sort(function (a, b) {
                        return b.sales - a.sales;
                    });
                    break;
                case 3:
                    this.goodsList = this.goodsList.sort(function (a, b) {
                        return b.number - a.number;
                    });
                    break;
                default: break;
            }
        },
        goShoppingCart () {
            this.$router.push({
                path: '/shoppingCart'
            });
        },
        addShoppingCart (goods) {
            this.$store.commit('addShoppingCart', goods);
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
