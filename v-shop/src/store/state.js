export default {
    users: {
        name: 'users',
        userList: [
            {
                name: 'Admin',
                coding: '000',
                password: 'admin',
                jurisdiction: 1,
                telephone: '###########',
                address: '############',
                avatar: 'http://img.qq1234.org/uploads/allimg/150128/20123A027-5.jpg'
            }
        ]
    },
    goods: {
        name: 'goods',
        goodsList: [
            {
                name: '限购型黑猫',
                coding: '00000000',
                price: 9999,
                number: 9999,
                category: '老婆',
                date: '9999-09-09',
                image: 'static/00000000.jpg',
                sales: 0 
            }
        ]
    },
    shoppingCart: {
        name: 'shoppingCart',
        shoppingCartList: []
    },
    cashRegister: {
        name: 'cashRegister',
        cashRegisterList: []
    },
    messages: {
        name: 'messages',
        messageList: []
    },
    // 当前用户
    currUser: {
        name: '未登录',
        avatar: ''
    },
}