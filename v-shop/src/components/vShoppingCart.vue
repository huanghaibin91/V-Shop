<template>
    <div>
        <Table border :columns="column" :data="data"></Table>
        <div class="checkout-box">
            <div class="total-price">
                <span>合计：<span>199</span></span>
            </div>
            <div class="checkout-btn">
                <Button type="error">确认结算</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
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
