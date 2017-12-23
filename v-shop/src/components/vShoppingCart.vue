<template>
    <div>
        <h2>购 物 车</h2>
        <Table @on-selection-change="selectionChange" :columns="shoppingCartTable" :data="allShoppingCartList"></Table>
        <div class="checkout-box">
            <div class="checkout-count">
                <span>共：<span>{{ checkoutCount.allCount }}</span>&nbsp;件</span>
            </div>
            <div class="total-price">
                <span>合计：<span>{{ checkoutCount.allTotal }}</span>&nbsp;元</span>
            </div>
            <div class="checkout-btn">
                <Button @click.native="changeCheckoutFlag" type="error">确认结算</Button>
            </div>
        </div>
        <!-- 结算弹窗 -->
        <Modal v-model="checkoutFlag" title="商品结算" width="350" @on-cancel="gobackGoodsList" ok-text="返回购物车" cancel-text="返回商品列表" :styles="{top: '20px'}">
            <Collapse accordion>
                <Panel>
                    &nbsp;现金支付
                    <div slot="content">
                        <Form :label-width="50">
                            <FormItem label="应收">
                                <Input v-model.number="total" :readonly="true" placeholder="商品总金额"></Input>
                            </FormItem>
                            <FormItem label="实收">
                                <Input v-model.number="cash" :autofocus="true" placeholder="请输入实收金额"></Input>
                            </FormItem>
                            <FormItem label="找零">
                                <Input v-model.number="cashChange" :readonly="true" placeholder="现金找零数目"></Input>
                            </FormItem> 
                        </Form>
                        <Button @click="submitCashCheckout" type="success" long>确认收款</Button>
                    </div>
                </Panel>
                <Panel>
                    &nbsp;支付宝支付
                    <p slot="content">
                        暂未完成
                    </p>
                </Panel>
                <Panel>
                    &nbsp;微信支付
                    <p slot="content">
                        暂未完成
                    </p>
                </Panel>
                <Panel>
                    &nbsp;银行卡 / 信用卡支付
                    <p slot="content">
                        暂未完成
                    </p>
                </Panel>
            </Collapse>
        </Modal>
    </div>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () {
        return {
            // 切换结算弹窗
            checkoutFlag: false,
            // 结算的总金额
            total: 0,
            // 现金结算
            cash: '',
            cashChange: '',
            // 操作表格
            shoppingCartTable: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '商品名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '商品单价',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '商品数量',
                    key: 'count',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('InputNumber', {
                            props: {
                                min: 1,
                                max: params.row.number
                            },
                            on: {
                                'on-change': (num) => {
                                    params.row.count = num;
                                    params.row.total = params.row.price * params.row.count;
                                    this.allShoppingCartList[params.index].count = num;
                                    this.allShoppingCartList[params.index].total = params.row.price * params.row.count;
                                    for (let i = 0, len = this.checkoutCount.goodsList.length; i < len; i++) {
                                        if (this.checkoutCount.goodsList[i].coding === params.row.coding) {
                                            this.checkoutCount.goodsList[i].count = num;
                                            this.checkoutCount.goodsList[i].total = params.row.price * params.row.count;
                                        }
                                    }
                                    this.countCheckoutGoods();
                                }
                            }
                        })
                    }
                },
                {
                    title: '商品金额',
                    key: 'total',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                                icon: 'trash-b'
                            },
                            on: {
                                click: () => {
                                    this.$store.commit('deleteShoppingCart', params.index);
                                    let _this = this;
                                    let vshopDB = null;
                                    IndexedDB.openDB('vshopDB', 1, vshopDB, {
                                        name: 'vshop',
                                        key: 'name'
                                    }, function (db) {
                                        let vshopDB = db;
                                        IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.shoppingCart]);
                                    });
                                }
                            }
                        }, '删除');
                    }
                }
            ],
        }
    },
    computed: {
        // 购物车中所有商品
        allShoppingCartList: function () {
            let shoppingCartList = this.$store.state.shoppingCart.shoppingCartList;
            let goodsList = [];
            shoppingCartList.forEach(function(element) {
                let goods = new Object();
                goods = {
                    _checked: true,
                    count: 1,      
                    total: element.price,          
                    name: element.name,
                    number: element.number,
                    coding: element.coding,
                    price: element.price,
                    category: element.category 
                };
                goodsList.push(goods);
            });
            return goodsList;
        },
        // 待结算商品统计
        checkoutCount: function () {
            let obj = new Object();
            obj.goodsList = [];
            this.allShoppingCartList.forEach(function (element) {
                let goods = new Object();
                goods = {
                    name: element.name,
                    coding: element.coding,
                    count: element.count,
                    price: element.price,
                    total: element.total,
                    category: element.category 
                };
                obj.goodsList.push(goods);
            });
            obj.allTotal = 0;
            obj.allCount = 0;
            for (let i = 0, len = obj.goodsList.length; i < len; i++) {
                obj.allTotal += obj.goodsList[i].total;  
                obj.allCount += obj.goodsList[i].count;              
            }
            return obj;
        }
    },
    watch: {
        // 监听输入现金金额
        cash: function (value) {
            this.cashChange = this.cash - this.total;
        }
    },
    methods: {
        // 弹出结算框
        changeCheckoutFlag  () {
            this.countCheckoutGoods();
            if (this.checkoutCount.goodsList.length === 0) {
                this.$Message.error('没有待结算商品，请添加后再操作');
            } else {
                this.checkoutFlag = true;
            }
        },
        // 返回商品列表
        gobackGoodsList () {
            this.$router.push({
                path: '/'
            });
        },
        // 统计待结算商品
        countCheckoutGoods () {
            let goodsList = this.checkoutCount.goodsList;
            this.checkoutCount.allCount = 0;
            this.checkoutCount.allTotal = 0;
            this.total = 0;
            for (let i = 0, len = goodsList.length; i < len; i++) {
                this.checkoutCount.allCount += goodsList[i].count;
                this.checkoutCount.allTotal += goodsList[i].total;
                this.total += goodsList[i].total;             
            }
        },
        // 选择要结算商品
        selectionChange (selection) {
            var _this = this;
            this.checkoutCount.goodsList = [];
            selection.forEach(function (element) {
                let goods = new Object();
                goods = {
                    name: element.name,
                    coding: element.coding,
                    count: element.count,
                    price: element.price,
                    total: element.total,
                };
                _this.checkoutCount.goodsList.push(goods);
            });
            this.countCheckoutGoods();
        },
        // 现金结算
        submitCashCheckout () {
            var cashRegister = this.checkoutCount;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            function addZero(val) {
                if (val < 10) {
                    val = '0' + val;
                } 
                return val;
            }
            cashRegister.time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
            cashRegister.cashier = this.$store.state.currUser.name;
            cashRegister.mode = '现金';
            if (this.$store.state.currUser.coding) {
                this.$store.commit('addCashRegister', cashRegister);
                this.$Message.success('商品结算成功');
                // 删除购物车已结算物品
                this.$store.commit('deleteCheckoutGoods', this.checkoutCount.goodsList);
                // 重置现金找零计算
                this.cash = '';
                this.cashChange = '';
                this.checkoutFlag = false;
                let _this = this;
                let vshopDB = null;
                IndexedDB.openDB('vshopDB', 1, vshopDB, {
                    name: 'vshop',
                    key: 'name'
                }, function (db) {
                    let vshopDB = db;
                    IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.shoppingCart]);
                    IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.goods]);
                    IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.cashRegister]);
                });
            } else {
                this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
            }
        }
    }
}
</script>

<style>
    h2 {
        padding: 10px 0;
    }
    .checkout-box {
        height: 48px;
        border: 1px solid #e9eaec;
        margin: 10px 0;
        background: white;
        display: flex;
        justify-content: flex-end;
    }
    .checkout-box>div {
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #goods-image {
        width: 3em;
        height: 3em;
        background-size: cover;
        vertical-align: middle;
    }
</style>
