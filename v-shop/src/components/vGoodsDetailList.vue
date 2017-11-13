<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="searchValue" placeholder="请输入商品编码或名称..."></Input>
                <Button @click="searchGoods" type="primary" icon="search">搜索</Button>
            </div>
        </div>
        <Table :columns="goodsTable" :data="goodsList"></Table>
        <Page @on-change="changePage" v-if="pageFlag" :total="pageTotal" :page-size="20" show-elevator class="page"></Page>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchValue: '',
            goodsTable: [
                {
                    title: '商品编码',
                    key: 'coding'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small',
                                icon: 'eye'
                            },
                            on: {
                                click: () => {
                                    this.$store.commit('getDetailGoods', params.row);
                                    this.$router.push({
                                        path: '/goodsDetail'
                                    })
                                }
                            }
                        }, '查看详情')
                    }
                }
            ],
            allGoodsList: this.$store.state.goods.goodsList,
            pageNum: 1
        }
    },
    watch: {
        searchValue: function (val) {
            this.pageNum = 1;
            this.allGoodsList = this.$store.state.goods.goodsList.filter(function (goods) {
                if (goods.name.includes(val) || goods.coding.includes(val)) {
                    return goods;
                }  
            });
        }
    },
    computed: {
        pageFlag: function () {
            if (this.allGoodsList.length > 20) {
                return true;
            } else {
                return false;
            }
        },
        pageTotal: function () {
            return this.allGoodsList.length;
        },
        goodsList: function () {
            let goodsList = [];
            let i = (this.pageNum - 1) * 20;
            while (i < this.pageNum * 20) {
                if (this.allGoodsList[i]) {
                    goodsList.push(this.allGoodsList[i]);
                }
                i++;
            }
            return  goodsList;
        },
    },
    methods: {
        // 搜索商品
        searchGoods: function () {
            this.pageNum = 1;
            this.allGoodsList =this.$store.state.goods.goodsList.filter(function (goods) {
                if (goods.name.includes(this.searchValue) || goods.coding.includes(this.searchValue)) {
                    return goods;
                }
            });
        },
        // 切换分页
        changePage (num) {
            this.pageNum = num;
        }
    }
}
</script>

<style scoped>
    .search-box {
        padding: 10px;
    }
    .search-input {
        display: flex;
        justify-content: center;
    }
    .search-input>div {
        max-width: 500px;
        min-width: 250px;
        padding-right: 15px;
    }
    .set-goods {
        padding: 5px;
        margin: 10px 0;
        border-radius: 5px;
        border: 1px dashed #1c2438;
    }
    .set-goods:hover {
        background-color: #e9eaec;
    }
    .set-goods span {
        font-weight: bold;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>
