<template>
    <div class="todolist">
        <div class="add-box">
            <Input v-model="value" placeholder="请输入待办事件内容..." style="width: 300px"></Input>
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></DatePicker>
            <Button type="primary" icon="plus">添加新事件</Button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .add-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
    .add-box>div {
        margin-right: 2em;
    }
</style>
