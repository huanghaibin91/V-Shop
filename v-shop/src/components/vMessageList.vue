<template>
    <Table :columns="columns" :data="data"></Table>
</template>

<script>
export default {
    data () {
        return {
            columns: [
                {
                    title: '日期',
                    key: 'date',
                    width: '300px',
                    align: 'center'
                },
                {
                    title: '详情',
                    key: 'content',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '200px',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small',
                                icon: 'trash-b'
                            }
                        }, '删除')
                    }
                }
            ],
            data: [
                {
                    date: '2017-10-26',
                    content: '限购型黑猫仅剩一件，请注意补货'
                }
            ]
        }
    }
}
</script>

<style>

</style>
