<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="value" placeholder="请输入商品编码或名称..."></Input>
                <Button @click="goShoppingCart" type="primary" icon="ios-cart">购物车</Button>
            </div>
            <div @click="quickSearch" class="quick-search">
                <button class="snacks">休闲零食</button>
                <button class="drink">酒水饮料</button>
                <button class="food">粮油副食</button>
                <button class="fruit">生鲜水果</button>
                <button class="toiletries">日常洗护</button>
                <button class="kitchen">厨卫用品</button>
            </div>
        </div>
        <Tabs type="card" @on-click="changeTab">
            <TabPane label="默认" v-if="defaultTab"  class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>{{ goods.name }}</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart(goods)" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page @on-change="changePage" v-if="pageFlag" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="价格" v-if="priceTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>{{ goods.name }}</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart(goods)" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page @on-change="changePage" v-if="pageFlag" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="销量" v-if="priceTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>{{ goods.name }}</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart(goods)" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page @on-change="changePage" v-if="pageFlag" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="库存" v-if="numberTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <img :src="goods.image" />
                                <p>{{ goods.name }}</p>
                                <div class="goods-message">
                                    <p>￥&nbsp;<span>{{ goods.price }}</span></p>
                                    <p>库存&nbsp;<span>{{ goods.number }}</span></p>
                                </div>
                            </div>
                            <div @click="addShoppingCart(goods)" class="add-btn" title="加入购物车">
                                <img src="../assets/plus.png" alt="加入购物车">
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Page @on-change="changePage" v-if="pageFlag" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
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
            goodsList: this.$store.state.goods.goodsList.slice(0, 24),
            defaultTab: true,
            priceTab: true,
            salesTab: true,
            numberTab: true,
            pageFlag: true
        }
    },
    watch: {
        // 监听搜索栏输入
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
            let page = this.allGoodsList.length;
            if (page / 24 > 1) {
                this.pageFlag = true;
            } else {
                this.pageFlag = false;
            }
            return page;
        }
    },
    methods: {
        // 快捷搜索
        quickSearch (event) {
            let cls = event.target.className;
            switch (cls) {
                case 'snacks':
                    this.goodsList = this.allGoodsList.filter(function (goods) {
                        if (goods.category === '休闲零食') {
                            return goods;
                        }  
                    });
                    break;
                case 'drink':
                    this.goodsList = this.allGoodsList.filter(function (goods) {
                        if (goods.category === '酒水饮料') {
                            return goods;
                        }  
                    });
                    break;
                case 'food':
                    this.goodsList = this.allGoodsList.filter(function (goods) {
                        if (goods.category === '粮油副食') {
                            return goods;
                        }  
                    });
                    break;
                case 'fruit':
                    this.goodsList = this.allGoodsList.filter(function (goods) {
                        if (goods.category === '生鲜水果') {
                            return goods;
                        }  
                    });
                    break;
                case 'toiletries':
                    this.goodsList = this.allGoodsList.filter(function (goods) {
                        if (goods.category === '日常洗护') {
                            return goods;
                        }  
                    });
                    break;
                case 'kitchen':
                    this.goodsList = this.allGoodsList.filter(function (goods) {
                        if (goods.category === '厨卫用品') {
                            return goods;
                        }  
                    });
                    break;
                default: break;
            }
        },
        // 切换Tab
        changeTab (name) {
            switch(name) {
                case 0:
                    this.allGoodsList = this.$store.state.goods.goodsList;
                    break;
                case 1:
                    this.allGoodsList = this.allGoodsList.sort(function (a, b) {
                        return b.price - a.price;
                    });
                    break;
                case 2:
                    this.allGoodsList = this.allGoodsList.sort(function (a, b) {
                        return b.sales - a.sales;
                    });
                    break;
                case 3:
                    this.allGoodsList = this.allGoodsList.sort(function (a, b) {
                        return b.number - a.number;
                    });
                    break;
                default: break;
            }
        },
        // 切换分页
        changePage (num) {
            if (num === 1) {
                this.goodsList = this.allGoodsList.slice(0, 24);
            } else {
                this.goodsList = this.allGoodsList.slice((num - 1) * 24, num * 24);
            }
        },
        // 转去购物车
        goShoppingCart () {
            this.$router.push({
                path: '/shoppingCart'
            });
        },
        // 添加商品进购物车
        addShoppingCart (goods) {
            let shoppingCartList = this.$store.state.shoppingCart.shoppingCartList;
            for (let i = 0, len = shoppingCartList.length; i < len; i++) {
                if (shoppingCartList[i].coding === goods.coding) {
                    return this.$Message.error('商品已加入购物车中');
                }
            }
            this.$store.commit('addShoppingCart', goods);
            this.$Message.success('商品加入购物车');
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
    .quick-search {
        padding: 10px 10px 0px 10px;
        text-align: center;
    }
    .quick-search button {
        padding: 1px 3px;
        margin: 0px 5px;
        color: #495060;
        background-color: white;
        border: 1px solid #dddee1;
        border-radius: 3px;
        cursor: pointer;
    }
    .quick-search button:hover {
        border: 1px solid #5cadff;
        color: #5cadff;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
    .goods {
        cursor: pointer;
        /* font-size: 0.5em; */
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
