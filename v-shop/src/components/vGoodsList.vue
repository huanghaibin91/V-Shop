<template>
    <Tabs type="card" @on-tab-remove="handleTabRemove">
        <TabPane label="默认" v-if="tab0">标签一的内容</TabPane>
        <TabPane label="价格" v-if="tab1">标签二的内容</TabPane>
        <TabPane label="销量" v-if="tab2">标签三的内容</TabPane>
        <TabPane label="库存" v-if="tab3">标签三的内容</TabPane>
    </Tabs>
</template>

<script>
export default {
    data () {
            return {
                tab0: true,
                tab1: true,
                tab2: true,
                tab: true
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

</style>
