<template>
    <div class="todolist">
        <div class="add-box">
            <Input v-model="value" placeholder="请输入待办事件内容..." style="width: 400px"></Input>
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></DatePicker>
            <Button type="primary" icon="plus">添加新事件</Button>
        </div>
        <div class="todo-list">
            <Table :columns="todoTable" :data="todoList"></Table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            todoTable: [
                {
                    title: '预定时间',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: '事件内容',
                    align: 'center',
                    key: 'content'
                },
                {
                    title: '事件状态',
                    align: 'center',
                    key: 'state'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'warning',
                                icon: 'trash-b',
                                size: 'small'
                            }
                        }, '删除');
                    }
                },
            ],
            todoList: [
                {
                    time: '2017-10-31 12:00',
                    content: '盘点店内商品库存',
                    state: '待完成'
                }
            ]
        }
    }
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
