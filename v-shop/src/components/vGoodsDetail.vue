<template>
    <div class="goods-detail">
        <Table :columns="column" :data="data" :disabled-hover="true" :border="true"></Table>
        <div>
            <h3>商品销售统计</h3> 
        </div>
        <div>
            <h3>商品操作历史记录</h3>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formTop: {
                input1: '',
                input2: '',
                input3: '',
                input5: '',
                input: ''
            },
            column: [
                {
                    title: '商品图片',
                    key: 'img',
                    // align: 'center',
                    className: 'goods-img',
                    render: (h, params) => {
                        return h('img', {
                            attrs: {
                                src: params.row.img,
                            }
                        });
                    }
                },
                {
                    title: '详细信息',
                    key: 'message',
                    align: 'center',
                    render: (h, params) => {
                        return h('Table', {
                            props: {
                                columns: this.$data.columns,
                                data: this.$data.datas,
                                showHeader: false,
                                border: true
                            }
                        });
                    }
                },
                {
                    title: '商品操作',
                    key: 'aciton',
                    align: 'center',
                    width: 150,
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'warning',
                                icon: 'settings',
                            }
                        }, '修改商品信息'); 
                    }
                }
            ],
            data: [
                {
                    img: '/static/00000000.jpg',
                }
            ],
            columns: [
                {
                    title: '名称',
                    key: 'name',
                    render: (h, params) => {
                        return h('strong', params.row.name);
                    }
                },
                {
                    title: '信息',
                    key: 'value'
                }
            ],
            datas: [
                {   
                    name: '商品名称',
                    value: '限购型黑猫'
                },
                {
                    name: '商品编码',
                    value: '00000000'
                },
                {
                    name: '商品单价',
                    value: 199
                },
                {
                    name: '商品数量',
                    value: 199
                },
                {
                    name: '商品分类',
                    value: '老婆'
                },
                {
                    name: '商品保质期',
                    value: '9999-09-09'
                },
                // {  
                //     render: (h, params) => {
                //         return h('Button', {
                //             props: {
                //                 type: 'warning',
                //                 size: 'small',
                //                 icon: 'eye'
                //             }
                //         }, '修改');
                //     }
                // }
            ],
        }
    }
}
</script>

<style>
    .goods-img div img {
        max-width: 300px;
        max-height: 300px;
    }
</style>
