<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="searchValue" placeholder="请输入商品编码或名称..."></Input>
                <Button @click="goShoppingCart" type="primary" icon="ios-cart">购物车</Button>
            </div>
            <div @click="quickSearch" class="quick-search">
                <button class="allgoods">全部商品</button>
                <button class="snacks">休闲零食</button>
                <button class="drink">酒水饮料</button>
                <button class="food">粮油副食</button>
                <button class="fruit">生鲜水果</button>
                <button class="toiletries">日常洗护</button>
                <button class="kitchen">厨卫用品</button>
                <button class="another">其它品类</button>
            </div>
        </div>
        <Tabs type="card" @on-click="changeTab">
            <TabPane label="默认" v-if="defaultTab" name="defaultTab"  class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <div class="img-box">
                                    <img :src="goods.image" />
                                </div>
                                <p class="goods-name">{{ goods.name }}</p>
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
                <p class="no-goods" v-if="!allGoodsList.length">当前没有商品，请去<router-link to="/goodsStorage" tag="a">商品操作 / 新商品入库</router-link>添加商品</p>
                <Page @on-change="changePage" v-if="pageFlag" :current="currPage" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="价格" v-if="priceTab" name="priceTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <div class="img-box">
                                    <img :src="goods.image" />
                                </div>
                                <p class="goods-name">{{ goods.name }}</p>
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
                <p class="no-goods" v-if="!allGoodsList.length">当前没有商品，请去<router-link to="/goodsStorage" tag="a">商品操作 / 新商品入库</router-link>添加商品</p>
                <Page @on-change="changePage" v-if="pageFlag" :current="currPage" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="销量" v-if="salesTab" name="salesTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <div class="img-box">
                                    <img :src="goods.image" />
                                </div>
                                <p class="goods-name">{{ goods.name }}</p>
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
                <p class="no-goods" v-if="!allGoodsList.length">当前没有商品，请去<router-link to="/goodsStorage" tag="a">商品操作 / 新商品入库</router-link>添加商品</p>
                <Page @on-change="changePage" v-if="pageFlag" :current="currPage" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="库存" v-if="numberTab" name="numberTab" class="goods-list-box">
                <Row>
                    <Col v-for="goods in goodsList" :key="goods.coding" :xs="8" :sm="6" :md="4" :lg="4">
                        <Card class="goods" :padding="0"> 
                            <div class="goods-box"> 
                                <div class="img-box">
                                    <img :src="goods.image" />
                                </div>
                                <p class="goods-name">{{ goods.name }}</p>
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
                <p class="no-goods" v-if="!allGoodsList.length">当前没有商品，请去<router-link to="/goodsStorage" tag="a">商品操作 / 新商品入库</router-link>添加商品</p>
                <Page @on-change="changePage" v-if="pageFlag" :current="currPage" :total="pageTotal" :page-size="24" show-elevator class="page"></Page>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () {
        return {
            searchValue: '',
            defaultTab: true,
            priceTab: true,
            salesTab: true,
            numberTab: true,
            // 分页
            currPage: 1,
        }
    },
    watch: {
        // 监听搜索栏输入
        searchValue: function (val) {
            this.$store.commit('searchGoods', val);
        }
    },
    computed: {
        allGoodsList: function () {
            if (this.$store.state.filterGoodsList.length === 0) {
                return this.$store.state.goods.goodsList;
            } else {
                return this.$store.state.filterGoodsList;
            }
        },
        pageFlag: function () {
            if (this.allGoodsList.length > 24) {
                return true;
            } else {
                return false;
            }
        },
        goodsList: function () {
            let goodsList = [];
            let i = (this.currPage - 1) * 24;
            while (i < this.currPage * 24) {
                if (this.allGoodsList[i]) {
                    goodsList.push(this.allGoodsList[i]);
                }
                i++;
            }
            return goodsList;
        },
        pageTotal: function () {
            return this.allGoodsList.length;
        }
    },
    methods: {
        // 快捷搜索
        quickSearch (event) {
            this.currPage = 1;
            this.$store.commit('categoryGoods', event.target.className);
        },
        // 切换Tab
        changeTab (name) {
            this.currPage = 1;
            this.$store.commit('sortGoods', name);
        },
        // 切换分页
        changePage (num) {
            this.currPage = num;
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
            if (goods.number > 0) {
                this.$store.commit('addShoppingCart', goods);
                this.$Message.success('商品加入购物车');
                let _this = this;
                let vshopDB = null;
                IndexedDB.openDB('vshopDB', 1, vshopDB, {
                    name: 'vshop',
                    key: 'name'
                }, function (db) {
                    let vshopDB = db;
                    IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.shoppingCart]);
                });
            } else {
                this.$Message.error('商品已售罄');
            }
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
    .no-goods {
        text-align: center;
        font-size: 1.2em;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
    .goods {
        cursor: pointer;
        color: #2b85e4;
        margin: 5px;
    }
    .goods-box {
        padding: 10px;
    }
    .goods-box .img-box {
        width: 100%;
        height: 0px;
        padding-bottom: 100%;
        overflow: hidden;
        margin: 0;
        position: relative;
    }
    .goods-box .img-box img {
        width: 100%;
    }
    .goods-name {
        height: 42px;
        overflow: hidden;
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
