<template>
    <div>
        <Table border :columns="column" :data="data"></Table>
        <div class="checkout-box">
            <div class="total-price">
                <span>合计：<span>199</span></span>
            </div>
            <div class="checkout-btn">
                <Button @click.native="changeCheckoutFlag" type="error">确认结算</Button>
            </div>
        </div>
        <!-- 结算弹窗 -->
        <Modal v-model="checkoutFlag" title="商品结算" width="350" ok-text="返回购物车" cancel-text="返回商品列表" class-name="checkout">
            <Collapse v-model="collapseFlag" accordion>
                <Panel name="1">
                    现金支付
                    <div slot="content">
                        <Form :model="cashCheckout" :label-width="50">
                            <FormItem label="应收">
                                <Input v-model="cashCheckout.total" :readonly="true" placeholder="请输入"></Input>
                            </FormItem>
                            <FormItem label="实收">
                                <Input v-model="cashCheckout.cash" :autofocus="true" placeholder="请输入实收金额"></Input>
                            </FormItem>
                            <FormItem label="找零">
                                <Input v-model="cashCheckout.change" :readonly="true" placeholder="请输入"></Input>
                            </FormItem> 
                        </Form>
                        <Button type="success" long>确认收款</Button>
                    </div>
                </Panel>
                <Panel name="2">
                    支付宝支付
                    <p slot="content">
                        暂未完成
                    </p>
                </Panel>
                <Panel name="3">
                    微信支付
                    <p slot="content">
                        暂未完成
                    </p>
                </Panel>
                <Panel name="4">
                    银行卡 / 信用卡支付
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
            column: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '商品数量',
                    key: 'number',
                    align: 'center'
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
                            }
                        }, '删除商品');
                    }
                }
            ],
            data: [
                {
                    name: '限购型黑猫',
                    number: '2',
                    price: '199',
                    total: '398'
                }
            ]
        }
    },
    methods: {
        changeCheckoutFlag  () {
            this.checkoutFlag = true;
        }
    }
}
</script>

<style scoped>
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
</style>
