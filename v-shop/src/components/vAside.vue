<template>
    <Menu theme="dark" class="aside" active-name="1" width="200px" accordion>
        <MenuItem name='person'>
            <Avatar icon="person" size="large" />
        </MenuItem>
        <MenuItem name="1">
            <Icon type="android-list"></Icon> 商品列表
        </MenuItem>
        <MenuItem name="2">
            <Icon type="settings"></Icon> 商品操作
        </MenuItem>
        <MenuItem name="3">
            <Icon type="calculator"></Icon> 收银操作
        </MenuItem>
        <MenuItem name="4">
            <Icon type="android-mail"></Icon> 消息通知 
        </MenuItem>
        <MenuItem name="5">
            <Icon type="podium"></Icon> 数据统计
        </MenuItem>
        <Submenu name="6">
            <template slot="title">
                <Icon type="ios-people"></Icon> 人员管理 
            </template>
            <MenuItem name="6-1">人员信息</MenuItem>
            <MenuItem name="6-2">人员添加</MenuItem>
        </Submenu>
        <MenuItem name="7">
            <Icon type="ios-alarm"></Icon> 待办事项
        </MenuItem>
    </Menu>
</template>

<script>


</script>

<style scoped>
    .aside {
        height: 100%;
        overflow-y: scroll;
    }
</style>
