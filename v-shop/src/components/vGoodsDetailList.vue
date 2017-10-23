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
                <Row class="set-goods" type="flex" align="middle">
                    <Col :xs="5" :sm="5" :md="5" :lg="5">
                        商品编码：<span>000000</span>
                    </Col>
                    <Col :xs="7" :sm="7" :md="7" :lg="7">
                        商品名称：<span>限购型黑猫</span>
                    </Col>
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        价格：<span>199</span>
                    </Col>
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        库存：<span>199</span>
                    </Col :xs="3" :sm="3" :md="3" :lg="3">
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        本月销量：<span>199</span>
                    </Col>
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        <Button type="primary" size="small" icon="document-text">商品详情</Button>
                    </Col>
                </Row>
                <Row class="set-goods" type="flex" align="middle">
                    <Col :xs="5" :sm="5" :md="5" :lg="5">
                        商品编码：<span>000000</span>
                    </Col>
                    <Col :xs="7" :sm="7" :md="7" :lg="7">
                        商品名称：<span>限购型黑猫</span>
                    </Col>
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        价格：<span>199</span>
                    </Col>
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        库存：<span>199</span>
                    </Col :xs="3" :sm="3" :md="3" :lg="3">
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        本月销量：<span>199</span>
                    </Col>
                    <Col :xs="3" :sm="3" :md="3" :lg="3">
                        <Button type="primary" size="small" icon="document-text">商品详情</Button>
                    </Col>
                </Row>
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
                tab3: true
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
