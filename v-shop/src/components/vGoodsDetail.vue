<template>
    <div class="goods-detail">
        <Table :columns="goodsDetailTable" :data="detailGoods" :disabled-hover="true" :border="true"></Table>
        <div>
            <h3>商品销售统计</h3> 
            <div id="sales-chart"></div>
        </div>
        <!-- <div>
            <h3>商品操作历史记录</h3>
        </div> -->
        <Modal title="更改商品信息" v-model="setGoodsFlag" :styles="{top: '20px'}" width="400"> 
            <Form :model="setGoods" :rules="checkSetGoods" :label-width="80"> 
                <FormItem label="商品名称" prop="name"> 
                    <Input v-model="setGoods.name"></Input> 
                </FormItem> 
                <FormItem label="商品单价" prop="price"> 
                    <Input v-model.number="setGoods.price"></Input> 
                </FormItem> 
                <FormItem label="商品库存" prop="number"> 
                    <Input v-model.number="setGoods.number"></Input> 
                </FormItem> 
                <FormItem label="商品分类" prop="category"> 
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
            <div class="set-goods-footer" slot="footer">
                <Button @click.native="submitChangeGoods" type="success" long>确认更改</Button>
                <Button @click.native="deleteGoods" type="error" long  title="删除商品，请谨慎操作" style="margin: 10px 0px 0px 0px">删除商品</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import Highmaps from 'highcharts/modules/map'

HighchartsMore(Highcharts) 
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
Highmaps(Highcharts)

export default {
    data () {
        // 检查价格
        const checkPrice = (rule, value, callback) => {
            const reg = /^(\d+\.\d{1,1}|\d+)$/g;
            if (value === '') {
                callback();
            } else if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('商品单价应为最多一位小数的数字'));
            }
        }
        // 检查数量
        const checkNumber = (rule, value, callback) => {
            const reg = /^[1-9]\d*$/g;
            if (value === '') {
                callback();
            } else {
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('商品数量为整数数字'));
                }
            }
        }
        return {
            setGoodsFlag: false,
            setGoods: {
                name: '', 
                price: '', 
                number: '', 
                category: '', 
                date: '', 
            },
            checkSetGoods: {
                price: { validator: checkPrice, trigger: 'blur' },
                number: { validator: checkNumber, trigger: 'blur' }, 
            },
            goodsDetailTable: [
                {
                    title: '商品图片',
                    key: 'img',
                    align: 'center',
                    width: 300,
                    className: 'goods-img',
                    render: (h, params) => {
                        return h('img', {
                            attrs: {
                                src: params.row.image,
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
                                columns: this.$data.goodsTable,
                                data: this.$data.goods,
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
            detailGoods: [
                {
                    image: this.$store.state.goods.detailGoods.image,
                }
            ],
            goodsTable: [
                {
                    title: '名称',
                    width: 150,
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
            goods: [
                {
                    name: '商品名称',
                    value: this.$store.state.goods.detailGoods.name
                },
                {
                    name: '商品编码',
                    value: this.$store.state.goods.detailGoods.coding
                },
                {
                    name: '商品单价',
                    value: this.$store.state.goods.detailGoods.price
                },
                {
                    name: '商品数量',
                    value: this.$store.state.goods.detailGoods.number
                },
                {
                    name: '商品分类',
                    value: this.$store.state.goods.detailGoods.category
                },
                {
                    name: '商品保质期',
                    value: this.$store.state.goods.detailGoods.date.getFullYear() + '-' + (this.$store.state.goods.detailGoods.date.getMonth() + 1) + '-' + this.$store.state.goods.detailGoods.date.getDate()
                }
            ],
            chart: null
        }
    },
    mounted () {
        let _this = this;
        this.chart = new Highcharts.Chart(document.getElementById('sales-chart'), {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '月销量 (件)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} 件</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: _this.$store.state.goods.detailGoods.name,
                    data: _this.$store.state.goods.detailGoods.sales
                }
            ]
        });
    },
    methods: {
        changeGoodsDetailFlag () {
            this.setGoodsFlag = true;
        },
        // 提交修改商品信息
        submitChangeGoods () {
            if (this.$store.state.currUser.coding) {
                if (this.$store.state.currUser.jurisdiction === '一级') {
                    this.$store.commit('changeGoods', this.setGoods);
                    this.$Message.success('修改商品信息成功');
                    this.setGoodsFlag = false;
                    let _this = this;
                    let vshopDB = null;
                    IndexedDB.openDB('vshopDB', 1, vshopDB, {
                        name: 'vshop',
                        key: 'name'
                    }, function (db) {
                        let vshopDB = db;
                        IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.goods]);
                    });
                } else {
                    this.$Message.error('当前用户没有修改商品信息权限');
                }
            } else {
                this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
            }
        },
        // 删除商品
        deleteGoods () {
            if (this.$store.state.currUser.coding) {
                if (this.$store.state.currUser.jurisdiction === '一级') {
                    this.$store.commit('deleteGoods');
                    this.$router.push({
                        path: '/goodsDetailList'
                    });
                    let _this = this;
                    let vshopDB = null;
                    IndexedDB.openDB('vshopDB', 1, vshopDB, {
                        name: 'vshop',
                        key: 'name'
                    }, function (db) {
                        let vshopDB = db;
                        IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.goods]);
                    });
                } else {
                    this.$Message.error('当前用户没有修改商品信息权限');
                }
            } else {
                this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
            }
        }
    }
}
</script>

<style>
    .goods-detail h3 {
        padding: 10px;
    } 
    .goods-detail .goods-img div img {
        width: 100%;
        height: 100%;
        max-width: 300px;
        max-height: 300px;
    }
</style>
