<template>
    <div class="cash-register">
        <div class="search-box">
            <Select v-model="personList" :clearable="true" placeholder="请选择收银员" style="width:200px"> 
                <Option v-for="person in personList" :value="person.name" :key="person.name">
                    {{ person.name }}
                </Option> 
            </Select>
            <DatePicker type="daterange" :options="datarange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> 
            <Button type="primary" icon="search">搜索</Button>
        </div>
        <div class="checkout-list">
            <Table :columns="checkoutTable" :data="checkoutList"></Table>
            <Page :total="100" show-elevator class="page"></Page>
        </div>
    </div>
</template>

<script>

import expandRow from './vCashDetail'

export default {
    components: {
        expandRow
    },
    data () {
        return {
            personList: [
                {
                    name: '小张'
                },
                {
                    name: '小赵'
                },
                {
                    name: '小李'
                }
            ],
            datarange: {
                shortcuts: [
                    {
                        text: '最近一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近三个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            },
            checkoutTable: [
                { 
                    type: 'expand', 
                    width: 50, 
                    render: (h, params) => { 
                        return h(expandRow, { 
                            props: { 
                                row: params.row 
                            }
                        }) 
                    } 
                },
                {
                    title: '收银时间',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '收银员',
                    align: 'center',                 
                    key: 'cashier'
                },
                {
                    title: '收银金额',
                    align: 'center',                 
                    key: 'sum'
                },
                {
                    title: '付款方式',
                    align: 'center',               
                    key: 'mode'
                }
            ],
            checkoutList: [
                {
                    date: '2017-10-29 22:25',
                    cashier: '小张',
                    mode: '现金',
                    sum: '200'
                }
            ]
        }
    }
}
</script>

<style scoped>
    .search-box {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-box>div {
        margin-right: 2em;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>
