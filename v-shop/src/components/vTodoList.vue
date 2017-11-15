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

import IndexedDB from '../indexedDB/IndexedDB'

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
                    width: 200,
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
                    width: 150,
                    align: 'center',
                    key: 'state'
                },
                {
                    title: '操作',
                    width: 150,
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
                                    this.$store.commit('deleteTodo', params.index);
                                    this.$Message.success('待办事件删除成功');
                                    let _this = this;
                                    let vshopDB = null;
                                    IndexedDB.openDB('vshopDB', 1, vshopDB, {
                                        name: 'vshop',
                                        key: 'name'
                                    }, function (db) {
                                        let vshopDB = db;
                                        IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.todo]);
                                    });
                                }
                            }
                        }, '删除');
                    }
                },
            ],
        }
    },
    computed: {
        todoList: function () {
            return this.$store.state.todo.todoList;
        }
    },
    methods: {
        // 添加待办事件
        addTodo () {
            let _this = this;
            if (this.todo.time && this.todo.content) {
                let year = this.todo.time.getFullYear();
                let month = this.todo.time.getMonth() + 1;
                let day = this.todo.time.getDate();
                let hour = this.todo.time.getHours();
                let min = this.todo.time.getMinutes();
                function addZero(val) {
                    if (val < 10) {
                        val = '0' + val;
                    } 
                    return val;
                }
                this.todo.time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
                this.$store.commit('addNewTodo', this.todo);
                let vshopDB = null;
                IndexedDB.openDB('vshopDB', 1, vshopDB, {
                    name: 'vshop',
                    key: 'name'
                }, function (db) {
                    let vshopDB = db;
                    IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.todo]);
                });
                // 启动定时器
                let timer = null;
                let content = this.todo.content;
                let time = this.todo.time;
                let planTime = new Date(this.todo.time).getTime();
                timer = setInterval(function () {
                    let newTime = new Date().getTime();
                    if (planTime - newTime <= 0) {
                        _this.$store.commit('changeTodoState', time);
                        let vshopDB = null;
                        IndexedDB.openDB('vshopDB', 1, vshopDB, {
                            name: 'vshop',
                            key: 'name'
                        }, function (db) {
                            let vshopDB = db;
                            IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.todo]);
                        });
                        _this.$Notice.warning({ 
                            title: '待办事件提醒', 
                            desc: content,
                            duration: 0
                        });
                        clearInterval(timer);
                    }
                }, 1000);
                this.$Message.success('待办事件添加成功');
                this.todo = {
                    time: '',
                    content: '',
                    state: '待完成'
                };
            } else {
                this.$Message.error('待办事件添加出错');
            }
        },
    }
}
</script>

<style>
    .add-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
    .add-box>div {
        margin-right: 2em;
    }
    .state-change span {
        color: red;
    }
</style>
