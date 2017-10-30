<template>
    <div class="goods-detail">
        <Table :columns="goodsDetailTable" :data="goods" :disabled-hover="true" :border="true"></Table>
        <div>
            <h3>商品销售统计</h3> 
        </div>
        <div>
            <h3>商品操作历史记录</h3>
        </div>
        <Modal title="更改商品信息" v-model="setGoodsFlag" :styles="{top: '20px'}" width="400"> 
            <Form :model="setGoods" :label-width="80"> 
                <FormItem label="商品名称"> 
                    <Input v-model="setGoods.name"></Input> 
                </FormItem> 
                <FormItem label="商品单价"> 
                    <Input v-model="setGoods.price"></Input> 
                </FormItem> 
                <FormItem label="商品库存"> 
                    <Input v-model="setGoods.number"></Input> 
                </FormItem> 
                <FormItem label="商品分类"> 
                    <Select v-model="setGoods.category" placeholder="请选择商品分类"> 
                        <Option value="休闲零食">休闲零食</Option> 
                        <Option value="酒水饮料">酒水饮料</Option> 
                        <Option value="粮油副食">粮油副食</Option>
                        <Option value="生鲜水果">生鲜水果</Option>
                        <Option value="日常洗护">日常洗护</Option>
                        <Option value="厨卫用品">厨卫用品</Option>
                    </Select> 
                </FormItem> 
                <FormItem label="商品保质期" prop="date"> 
                    <DatePicker type="date" placeholder="选择日期" v-model="setGoods.date"></DatePicker> 
                </FormItem> 
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            setGoodsFlag: false,
            setGoods: {
                name: '', 
                price: '', 
                number: '', 
                category: '', 
                date: '', 
            },
            goodsDetailTable: [
                {
                    title: '商品图片',
                    key: 'img',
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
                            },
                            on: {
                                click: () => {
                                    this.setGoodsFlag = true;
                                }
                            }
                        }, '修改商品信息'); 
                    }
                }
            ],
            goods: [
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
    },
    methods: {
        changeGoodsDetailFlag () {
            this.setGoodsFlag = true;
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
