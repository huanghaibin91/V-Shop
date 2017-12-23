<template>
    <div class="cash-register">
        <div class="cash-search-box">
            <Select v-model="user" :clearable="true" placeholder="请选择收银员" style="width:200px"> 
                <Option v-for="user in userList" :value="user.name" :key="user.coding">
                    {{ user.name }}
                </Option> 
                <Option value="所有用户">所有用户</Option>
            </Select>
            <DatePicker type="daterange" v-model="date" :options="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> 
            <Button @click.native="searchCashRegister" type="primary" icon="search">搜索</Button>
        </div>
        <div class="checkout-list">
            <Table :columns="cashRegisterTable" :data="cashRegisterList"></Table>
            <Page @on-change="changePage" v-if="pageFlag" :current="currPage" :total="pageTotal" :page-size="20" show-elevator class="page"></Page>
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
            date: '',
            userList: this.$store.state.users.userList,
            daterange: {
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
                    title: '合计数量',
                    align: 'center',
                    key: 'allCount'
                },
                {
                    title: '收银金额',
                    align: 'center',                 
                    key: 'allTotal'
                },
                {
                    title: '付款方式',
                    align: 'center',               
                    key: 'mode'
                }
            ],
            allCashRegisterList: this.$store.state.cashRegister.cashRegisterList,
            currPage: 1
        }
    },
    computed: {
        pageFlag: function () {
            if (this.allCashRegisterList.length > 20) {
                return true;
            } else {
                return false;
            }
        },
        cashRegisterList: function () {
            let cashRegisterList = [];
            let i = (this.currPage - 1) * 20;
            while (i < this.currPage * 20) {
                if (this.allCashRegisterList[i]) {
                    cashRegisterList.push(this.allCashRegisterList[i]);
                }
                i++;
            }
            return cashRegisterList;
        },
        pageTotal: function () {
            return this.allCashRegisterList.length;
        }
    },
    methods: {
        // 搜索收银记录
        searchCashRegister () {
            let _this = this;
            this.currPage = 1;
            if (this.user === '' || this.user === '所有用户') {
                if (this.date.length === 0) {
                    this.allCashRegisterList = this.$store.state.cashRegister.cashRegisterList;
                } else {
                    this.allCashRegisterList = this.$store.state.cashRegister.cashRegisterList.filter(function (element) {
                        let subTime = _this.date[0].getTime();
                        let supTime = _this.date[1].getTime();
                        let cashTime = new Date(element.time).getTime();
                        if (subTime <= cashTime && cashTime <= supTime) {
                            return element;
                        }
                    });
                }
            } else {
                if (this.date.length === 0) {
                    this.allCashRegisterList = this.$store.state.cashRegister.cashRegisterList.filter(function (element) {
                        if (element.cashier === _this.user) {
                            return element;
                        }
                    });
                } else {
                    this.allCashRegisterList = this.$store.state.cashRegister.cashRegisterList.filter(function (element) {
                        let subTime = _this.date[0].getTime();
                        let supTime = _this.date[1].getTime();
                        let cashTime = new Date(element.time).getTime();
                        if (element.cashier === _this.user && subTime <= cashTime && cashTime <= supTime) {
                            return element;
                        }
                    });
                }
            }
        },
        // 切换分页
        changePage (num) {
            this.currPage = num;
        },
    }
}
</script>

<style>
    .cash-search-box {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cash-search-box>div {
        margin-right: 2em;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
    .cash-register td.ivu-table-expanded-cell {
        padding: 10px;
        margin: 0px;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>
