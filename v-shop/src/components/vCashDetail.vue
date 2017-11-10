<template>
    <Table size="small" border :columns="cashDetailTable" :data="row.goodsList"></Table>
</template>

<script>
export default {
    props: {
        row: Object
    },
    data () {
        return {
            cashDetailTable: [
                {
                    title: '商品编码',
                    key: 'coding',
                    align: 'center'
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
                    title: '数量',
                    key: 'count',
                    align: 'center'
                },
                {
                    title: '合计',
                    key: 'total',
                    align: 'center'
                }
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>
    
</style>
