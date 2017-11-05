<template>
    <div class="cash-register">
        <div class="search-box">
            <Select v-model="user" :clearable="true" placeholder="请选择收银员" style="width:200px"> 
                <Option v-for="user in userList" :value="user.name" :key="user.coding">
                    {{ user.name }}
                </Option> 
            </Select>
            <DatePicker type="daterange" :options="datarange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> 
            <Button type="primary" icon="search">搜索</Button>
        </div>
        <div class="checkout-list">
            <Table :columns="cashRegisterTable" :data="cashRegisterList"></Table>
            <Page v-if="pageFlag" :total="pageTotal" show-elevator class="page"></Page>
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
            user: '',
            userList: this.$store.state.users.userList,
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
            cashRegisterTable: [
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
                    key: 'time'
                },
                {
                    title: '收银员',
                    align: 'center',                 
                    key: 'cashier'
                },
                {
                    title: '收银金额',
                    align: 'center',                 
                    key: 'total'
                },
                {
                    title: '付款方式',
                    align: 'center',               
                    key: 'mode'
                }
            ],
            cashRegisterList: this.$store.state.cashRegister.cashRegisterList,
            pageFlag: false
        }
    },
    computed: {
        pageTotal: function () {
            let page = Math.ceil(this.cashRegisterList / 20);
            if (page > 1) {
                this.pageFlag = true;
            } else {
                this.pageFlag = false;
            }
            return page;
        }
    },
    methods: {
        consoleMessage () {
            console.log(this.cashRegisterList);
            console.log(this.$store.cashRegister.cashRegisterList);
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
    .ivu-table-expanded-cell {
        padding: 0px;
        margin: 0px;
    }
</style>
