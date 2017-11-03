<template>
    <div>
        <Menu theme="dark" class="aside" active-name="goods-list" @on-select="changeMenuItem" width="200px" accordion>
            <MenuItem name='person' class="person">
                <Avatar :src="this.$store.state.currUser.avatar" icon="person" size="large" />
                <p>{{ this.$store.state.currUser.name }}</p>
            </MenuItem>
            <MenuItem name="goods-list">
                <Icon type="android-list"></Icon> 商品列表
            </MenuItem>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="settings"></Icon>
                    商品操作
                </template>
                <MenuItem name="goods-storage">商品入库</MenuItem>
                <MenuItem name="goods-detail">详细信息</MenuItem>
            </Submenu>
            <MenuItem name="cash-register">
                <Icon type="calculator"></Icon> 收银记录
            </MenuItem>
            <MenuItem name="message-list">
                <Icon type="android-mail"></Icon> 消息通知 
            </MenuItem>
            <MenuItem name="data-statistics">
                <Icon type="podium"></Icon> 数据统计
            </MenuItem>
            <MenuItem name="person-list">
                <Icon type="ios-people"></Icon> 人员管理 
            </MenuItem>
            <MenuItem name="todo-list">
                <Icon type="ios-alarm"></Icon> 待办事项
            </MenuItem>
        </Menu>
        <!-- 登录弹窗 -->
        <Modal title="欢迎登录" class-name="login-in" v-model="loginFlag" ok-text="登录" width="300">
            <Form ref="login" :model="user" :rules="checkUser">
                <FormItem prop="coding">
                    <Input type="text" v-model="user.coding" placeholder="员工工号">
                        <Icon type="person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="user.password" placeholder="登录密码">
                        <Icon type="locked" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <p style="text-align: center;">第一次登录，可以使用账号：000，密码：admin，登录</p>
            <div slot="footer">
                <Button @click.native="cancelLogin" type="text">取消</Button>
                <Button @click.native.enter="loginSubmit" type="primary">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    data () {
        // 检查员工工号
        const checkCoding = (rule, value, callback) => {
            const reg = /^[0-9]\d*$/g;
            if (value === '') {
                callback(new Error('登录账号不能为空'));
            } else {
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('登录账号为员工工号，应为纯数字'));
                }
            }
        }
        return {
            loginFlag: true,
            user: {
                coding: '',
                password: ''
            },
            checkUser: {
                coding: { required: true, validator: checkCoding, trigger: 'blur' },
                password: { required: true, message: '登录密码不能为空', trigger: 'blur' },
            }
        }
    },
    methods: {
        changeMenuItem (name) {
            switch(name) {
                case 'person':
                    this.loginFlag = true;
                    break;
                case 'goods-list':
                    this.$router.push({
                        path: '/'
                    });
                    break;
                case 'goods-storage':
                    this.$router.push({
                        path: '/goodsStorage'
                    });
                    break;
                case 'goods-detail':
                    this.$router.push({
                        path: '/goodsDetailList'
                    });
                    break;
                case 'cash-register':
                    this.$router.push({
                        path: '/cashRegister'
                    });
                    break;
                case 'message-list':
                    this.$router.push({
                        path: '/messageList'
                    });
                    break;
                case 'data-statistics':
                    this.$router.push({
                        path: '/dataStatistics'
                    });
                    break;
                case 'person-list':
                    this.$router.push({
                        path: '/personList'
                    });
                    break;
                case 'todo-list':
                    this.$router.push({
                        path: '/todoList'
                    });
                    break;
                default:
                    break;
            }
        },
        loginSubmit () {
            const users = this.$store.state.users.userList;
            this.$refs.login.validate((valid) => { 
                if (valid) { 
                    for (let i = 0, len = users.length; i < len; i++) {
                        if (users[i].coding === this.user.coding) {
                            if (users[i].password === this.user.password) {
                                this.loginFlag = false;
                                this.$refs['login'].resetFields();
                                // 将当前用户信息更改为users[i]
                                this.$store.commit('setCurrUser', users[i]);
                            } else {
                                this.$Message.error('密码输入错误！'); 
                                this.user.password = '';
                            }
                        } else {
                            this.$Message.error('账号不存在！'); 
                            this.$refs['login'].resetFields();
                        }
                    }
                } else { 
                    this.$Message.error('表单验证失败！'); 
                } 
            });
        },
        cancelLogin () {
            this.loginFlag = false;
        }
    }
}

</script>

<style>
    .aside {
        height: 100%;
        overflow-y: scroll;
    }
    .person {
        display: flex;
        align-items: center;
    }
    .person p {
        margin-left: 2em;
    }
    .login-in {
        background: url('../assets/login-bg.jpg') no-repeat center fixed;
    }
</style>
