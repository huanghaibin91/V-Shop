<template>
    <div>
        <h3>
            消息通知
            <Button @click.native="changeSetMessageFlag" type="primary" icon="settings" size="small">消息通知设置</Button>
        </h3>
        <Table :columns="messageTable" :data="messageList"></Table>
        <Page @on-change="changePage" v-if="pageFlag" :total="pageTotal" :page-size="20" show-elevator class="page"></Page>
        <!-- 消息通知设置弹窗 -->
        <Modal title="设置消息通知" v-model="setMessageFlag" width="300"> 
            <Form ref="newLimit" :model="setMessage" :label-width="80"> 
                <FormItem label="商品名称" prop="limitNumber"> 
                    <Input v-model.number="setMessage.limitNumber" placeholder="输入要设置的库存限制"></Input> 
                </FormItem> 
                <FormItem label="商品单价" prop="limitDate"> 
                    <Input v-model.number="setMessage.limitDate" placeholder="输入要设置的保质期时间限制"></Input> 
                </FormItem> 
            </Form>
            <div slot="footer">
                <Button @click.native="resetChangeMessage" type="text">重置</Button>
                <Button @click.native="submitChangeMessage" type="primary">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () {
        return {
            setMessageFlag: false,
            pageFlag: false,
            setMessage: {
                limitNumber: '',
                limitDate: ''
            },
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
                                    if (this.$store.state.currUser.coding) {
                                        this.$store.commit('deleteMessage', params.index);
                                        let _this = this;
                                        let vshopDB = null;
                                        IndexedDB.openDB('vshopDB', 1, vshopDB, {
                                            name: 'vshop',
                                            key: 'name'
                                        }, function (db) {
                                            let vshopDB = db;
                                            IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.messages]);
                                        });
                                    } else {
                                        this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
                                    }
                                }
                            }
                        }, '删除')
                    }
                }
            ],
            allMessageList: this.$store.state.messages.messageList,
            // messageList: this.$store.state.messages.messageList
        }
    },
    computed: {
        messageList: function () {
            return this.allMessageList.slice(0, 20);
        },
        pageTotal: function () {
            let page = this.allMessageList.length;
            if (page / 20 > 1) {
                this.pageFlag = true;
            } else {
                this.pageFlag = false;
            }
            return page;
        }
    },
    methods: {
        changeSetMessageFlag () {
            this.setMessageFlag = true;
        },
        // 提交设置消息通知
        submitChangeMessage () {
            if (this.$store.state.currUser.coding) {
                if (this.$store.state.currUser.jurisdiction === '一级') {
                    this.$store.commit('changeMessage', this.setMessage);
                    this.$Message.success('设置新消息通知限制成功');
                    this.setMessageFlag = false;
                    let _this = this;
                    let vshopDB = null;
                    IndexedDB.openDB('vshopDB', 1, vshopDB, {
                        name: 'vshop',
                        key: 'name'
                    }, function (db) {
                        let vshopDB = db;
                        IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.messages]);
                    });
                } else {
                    this.$Message.error('当前用户没有修改商品信息权限');
                }
            } else {
                this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
            }
        },
        // 重置表单
        resetChangeMessage () {
            this.$refs['newLimit'].resetFields(); 
        },
        // 切换分页
        changePage (num) {
            if (num === 1) {
                this.messageList = this.allMessageList.slice(0, 20);
            } else {
                this.messageList = this.allMessageList.slice((num - 1) * 20, num * 20);
            }
        },
    }
}
</script>

<style scoped>
    h3 {
        padding: 10px;
    }
    h3 button {
        margin-left: 20px;
    }
    .warning {
        color: red;
    }
    .page {
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>
