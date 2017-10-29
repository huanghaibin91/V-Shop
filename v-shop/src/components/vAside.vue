<template>
    <div>
        <Menu theme="dark" class="aside" active-name="goods-list" @on-select="changeMenuItem" width="200px" accordion>
            <MenuItem name='person' class="person">
                <Avatar icon="person" size="large" />
                <p>梁非凡</p>
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
        <Modal title="欢迎登录" class-name="login-in" v-model="loginFlag" loading="loading" ok-text="登录" width="300">
            <Form ref="formInline" :model="user" :rules="checkUser">
                <FormItem prop="user">
                    <Input type="text" v-model="user.name" placeholder="用户名">
                        <Icon type="person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="user.password" placeholder="密码">
                        <Icon type="locked" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

export default {
    data () {
        return {
            loginFlag: false,
            user: {
                name: '',
                password: ''
            },
            checkUser: {

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
