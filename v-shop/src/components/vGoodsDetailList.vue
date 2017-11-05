<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="searchValue" placeholder="请输入商品编码或名称..."></Input>
                <Button @click="searchGoods" type="primary" icon="search">搜索</Button>
            </div>
        </div>
        <Table :columns="goodsTable" :data="goodsList"></Table>
        <Page v-if="pageFlag" :total="pageTotal" show-elevator class="page"></Page>
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
            goodsList: this.$store.state.goods.goodsList,
            pageFlag: false
        }
    },
    watch: {
        searchValue: function (val) {
            this.goodsList = this.allGoodsList.filter(function (goods) {
                if (goods.name.includes(val) || goods.coding.includes(val)) {
                    return goods;
                }  
            });
        }
    },
    computed: {
        pageTotal: function () {
            let page = Math.ceil(this.goodsList / 20);
            if (page > 1) {
                this.pageFlag = true;
            } else {
                this.pageFlag = false;
            }
            return page;
        }
    },
    methods: {
        searchGoods: function () {
            this.goodsList = this.allGoodsList.filter(function (goods) {
                if (goods.name.includes(this.searchValue) || goods.coding.includes(this.searchValue)) {
                    return goods;
                }  
            });
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
