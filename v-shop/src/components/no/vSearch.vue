<template>
    <div class="search-box">
        <div class="search-input">
            <Input v-model="value" placeholder="请输入商品编码或名称..."></Input>
            <Button type="primary" icon="ios-search">搜索</Button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value: ''
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
</style>
