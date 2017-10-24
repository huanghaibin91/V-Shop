<template>
    <div class="goods-list">
        <div class="search-box">
            <div class="search-input">
                <Input v-model="value" placeholder="请输入商品编码或名称..."></Input>
                <Button type="primary" icon="search">搜索</Button>
            </div>
        </div>
        <Tabs type="card" @on-tab-remove="handleTabRemove">
            <TabPane label="默认" v-if="tab0"  class="goods-list-box">
                <Table :columns="columns" :data="data"></Table>
                <Page :total="100" show-elevator class="page"></Page>
            </TabPane>
            <TabPane label="价格" v-if="tab1" class="goods-list-box">标签二的内容</TabPane>
            <TabPane label="销量" v-if="tab2" class="goods-list-box">标签三的内容</TabPane>
            <TabPane label="库存" v-if="tab3" class="goods-list-box">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value: '',
            tab0: true,
            tab1: true,
            tab2: true,
            tab3: true,
            columns: [
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
                            }
                        }, '查看详情')
                    }
                }
            ],
            data: [
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫限购型黑猫限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                },
                {
                    coding: '00000000',
                    name: '限购型黑猫'
                }
            ]
        }
    },
    methods: {
        handleTabRemove (name) {
            this['tab' + name] = false;
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
