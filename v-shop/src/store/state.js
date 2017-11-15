export default {
    // 用户列表
    users: {
        name: 'users',
        userList: [
            {
                name: 'Admin',
                coding: '000',
                position: '管理员',
                password: 'admin',
                jurisdiction: '一级',
                telephone: '###########',
                address: '############',
                avatar: 'http://img.qq1234.org/uploads/allimg/150128/20123A027-5.jpg'
            }
        ]
    },
    // 筛选商品列表
    filterGoodsList: [],
    // 商品列表
    goods: {
        name: 'goods',
        detailGoods: {},
        goodsList: []
    },
    // 购物车列表
    shoppingCart: {
        name: 'shoppingCart',
        number: 0,
        shoppingCartList: []
    },
    // 收银记录列表
    cashRegister: {
        name: 'cashRegister',
        name: 'cashRegister',
        cashRegisterList: []
    },
    // 消息通知列表
    messages: {
        name: 'messages',
        today: '2017-11-12',
        name: 'messages',
        number: 0,
        // 保质期
        limitDate: 30,
        // 库存
        limitNumber: 3,
        messageList: []
    },
    // 待办事件列表
    todo: {
        name: 'todo',
        todoList: []
    },
    // 当前用户
    currUser: {
        name: '未登录',
        avatar: ''
    },
}