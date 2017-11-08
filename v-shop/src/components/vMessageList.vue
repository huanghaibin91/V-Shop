<template>
    <div>
        <h3>消息通知</h3>
        <Table :columns="messageTable" :data="messageList"></Table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            messageTable: [
                {
                    title: '日期',
                    key: 'date',
                    width: '200px',
                    align: 'center'
                },
                {
                    title: '详情',
                    key: 'content',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '200px',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small',
                                icon: 'trash-b'
                            },
                            on: {
                                click: () => {
                                    this.$store.commit('deleteMessage', params.index);
                                }
                            }
                        }, '删除')
                    }
                }
            ],
            messageList: this.$store.state.messages.messageList
        }
    }
}
</script>

<style scoped>
    h3 {
        padding: 10px;
    }
</style>
