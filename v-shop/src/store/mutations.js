export default {
    // 设置当前用户
    setCurrUser (state, user) {
        state.currUser = user;
    },
    // 添加新用户
    addNewUser (state, user) {
        state.users.userList.push(user);
    },
    // 删除用户
    deleteUser (state, index) {
        state.users.userList.splice(index, 1);
    },
    // 新商品入库
    addNewGoods (state, goods) {
        state.goods.goodsList.push(goods);
    },
    // 快捷入库
    addOldGoods (state, goods) {
        const goodsList = state.goods.goodsList;
        for (let i = 0, len = goodsList.length; i < len; i++) {
            if (goodsList[i].coding === goods.coding) {
                goodsList[i].number = parseInt(goodsList[i].number, 10) + parseInt(goods.number, 10);
                goodsList[i].date = goods.date;
            }
        }
    },
    // 删除商品
    deleteGoods (state, index) {

    },
    // 更改商品信息
    changeGoods (state, goods) {

    },
    // 添加商品到购物车
    addShoppingCart (state, goods) {
        state.shoppingCart.shoppingCartList.push(goods);
        state.shoppingCart.number += 1;
    },
    // 删除购物车商品
    deleteShoppingCart (state, index) {
        state.shoppingCart.shoppingCartList.splice(index, 1);
        state.shoppingCart.number -= 1;
    },
    // 提交收银记录
    addCashRegister (state, cashRegiter) {
        state.cashRegister.cashRegisterList.unshift(cashRegiter);
    }
}