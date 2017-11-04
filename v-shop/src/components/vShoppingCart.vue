<template>
    <div>
        <h2>购 物 车</h2>
        <Table @on-selection-change="selectionChange" :columns="shoppingCartTable" :data="allShoppingCartList"></Table>
        <div class="checkout-box">
            <div>
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
                                <Input v-model.number="cashCheckout.total" :readonly="true" placeholder="请输入"></Input>
                            </FormItem>
                            <FormItem label="实收">
                                <Input v-model.number="cashCheckout.cash" :autofocus="true" placeholder="请输入实收金额"></Input>
                            </FormItem>
                            <FormItem label="找零">
                                <Input v-model.number="cashCheckout.change" :readonly="true" placeholder="请输入"></Input>
                            </FormItem> 
                        </Form>
                        <Button type="success" long>确认收款</Button>
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
            cashCheckout: {
                total: '',
                cash: '',
                change: ''
            },
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
                    title: '商品数量',
                    key: 'count',
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
                                    this.countCheckoutGoods();
                                }
                            }
                        })
                    }
                },
                {
                    title: '商品单价',
                    key: 'price',
                    align: 'center'
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
    methods: {
        changeCheckoutFlag  () {
            // this.checkoutFlag = true;
            this.coutCheckoutGoods();
            console.log(this.checkoutCount); // 这里正确
        },
        // 统计待结算商品
        coutCheckoutGoods () {
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
            // for (let i = 0, len = selection.length; i < len; i++) {
            //     this.checkoutCount.count += selection[i].count;
            //     this.checkoutCount.total += selection[i].total;                
            // }
            // console.log(this.allShoppingCartList);
            // console.log(this.checkoutCount);

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
