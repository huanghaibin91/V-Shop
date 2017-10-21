<template>
    <Row class="set-goods" type="flex" align="middle">
        <Col :xs="6" :sm="6" :md="6" :lg="6">
            商品编码：<span>000000</span>
        </Col>
        <Col :xs="6" :sm="6" :md="6" :lg="6">
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
</template>

<script>
export default {

}
</script>

<style scoped>
    .set-goods {
        padding: 5px;
        border-radius: 5px;
        border: 1px dashed #1c2438;
    }
    .set-goods:hover {
        background-color: #e9eaec;
    }
    .set-goods span {
        font-weight: bold;
    }
</style>
