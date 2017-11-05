<template>
    <div>
        <h2>购 物 车</h2>
        <Table @on-selection-change="selectionChange" :columns="shoppingCartTable" :data="allShoppingCartList"></Table>
        <div class="checkout-box">
            <div class="checkout-count">
                <span>共：<span>{{ checkoutCount.count }}</span>&nbsp;件</span>
            </div>
            <div class="total-price">
                <span>合计：<span>{{ checkoutCount.total }}</span>&nbsp;元</span>
            </div>
            <div class="checkout-btn">
                <Button @click.native="changeCheckoutFlag" type="error">确认结算</Button>
            </div>
        </div>
        <!-- 结算弹窗 -->
        <Modal v-model="checkoutFlag" title="商品结算" width="350" ok-text="返回购物车" cancel-text="返回商品列表" :styles="{top: '20px'}">
            <Collapse accordion>
                <Panel>
                    &nbsp;现金支付
                    <div slot="content">
                        <Form :model="cashCheckout" :label-width="50">
                            <FormItem label="应收">
                                <Input v-model.number="checkoutCount.total" :readonly="true" placeholder="商品总金额"></Input>
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
export default {
    data () {
        return {
            checkoutFlag: false,
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
            let goodsList = this.$store.state.shoppingCart.shoppingCartList;
            goodsList.forEach(function(element) {
                element._checked = true;
                element.count = 1;
                element.total = element.price;
            }, this);
            return goodsList;
        },
        // 结算商品统计
        checkoutCount: function () {
            let obj = {};
            obj.goodsList = this.allShoppingCartList;
            obj.total = 0;
            obj.count = 0;
            for (let i = 0, len = obj.goodsList.length; i < len; i++) {
                obj.count += obj.goodsList[i].count;
                obj.total += obj.goodsList[i].total;                
            }
            return obj;
        }
    },
    watch: {
        cash: function (value) {
            this.cashChange = this.cash - this.checkoutCount.total;
        }
    },
    methods: {
        changeCheckoutFlag  () {
            this.checkoutFlag = true;
            this.countCheckoutGoods();
            // console.log(this.checkoutCount.total);
        },
        // 统计待结算商品
        countCheckoutGoods () {
            let goodsList = this.checkoutCount.goodsList;
            this.checkoutCount.count = 0;
            this.checkoutCount.total = 0;
            for (let i = 0, len = goodsList.length; i < len; i++) {
                this.checkoutCount.count += goodsList[i].count;
                this.checkoutCount.total += goodsList[i].total;            
            }
        },
        selectionChange (selection) {
            this.checkoutCount.goodsList = selection;
            this.countCheckoutGoods();
            // console.log(this.checkoutCount.total);
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
            this.$store.commit('addCashRegister', cashRegister);
            this.$Message.success('商品结算成功');
            // 删除购物车已结算物品
            
            this.cash = '';
            this.cashChange = '';
            this.checkoutFlag = false;
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
