<template>
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
</template>

<script>

export default {
    methods: {
        changeMenuItem (name) {
            switch(name) {
                case 'person':
                    // 这里弹出登录框
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

<style scoped>
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
</style>
