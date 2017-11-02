<template>
    <div class="todolist">
        <div class="add-box">
            <Input v-model="todo.content" placeholder="请输入待办事件内容..." style="width: 400px"></Input>
            <DatePicker v-model="todo.time" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></DatePicker>
            <Button @click.native="addTodo" type="primary" icon="plus">添加新事件</Button>
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
            todo: {
                time: '',
                content: '',
                state: '待完成'
            },
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
                            },
                            on: {
                                click: () => {
                                    this.deleteTodo(params.index);
                                }
                            }
                        }, '删除');
                    }
                },
            ],
            todoList: [],
        }
    },
    methods: {
        addTodo () {
            var year = this.todo.time.getFullYear();
            var month = this.todo.time.getMonth() + 1;
            var day = this.todo.time.getDate();
            var hour = this.todo.time.getHours();
            var min = this.todo.time.getMinutes();
            function addZero(val) {
                if (val < 10) {
                    val = '0' + val;
                } 
                return val;
            }
            this.todo.time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
            if (this.todo.time && this.todo.content) {
                this.todoList.push(this.todo);
                this.todo = {
                    time: '',
                    content: '',
                    state: '待完成'
                };
            }
        },
        deleteTodo (index) {
            this.todoList.splice(index, 1);
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
