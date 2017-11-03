<template>
    <Modal v-model="checkoutFlag" title="商品结算" width="350" ok-text="返回购物车" cancel-text="返回商品列表" class-name="checkout">
        <Collapse v-model="collapseFlag" accordion>
            <Panel name="1">
                现金支付
                <div slot="content">
                    <Form :model="checkout" :label-width="50">
                        <FormItem label="应收">
                            <Input v-model="checkout.total" :readonly="true" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="实收">
                            <Input v-model="checkout.cash" :autofocus="true" placeholder="请输入实收金额"></Input>
                        </FormItem>
                        <FormItem label="找零">
                            <Input v-model="checkout.change" :readonly="true" placeholder="请输入"></Input>
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
</template>

<script>
export default {
    data () {
        return {
            checkoutFlag: false,
            collapseFlag: false,
            checkout: {
                cash: '',
                total: '',
                change: ''
            }
        }
    }
}
</script>

<style>
    .checkout .ivu-modal {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
