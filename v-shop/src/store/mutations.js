export default {
    // 设置当前用户
    setCurrUser (state, user) {
        state.currUser = user;
    },
    // 新商品入库
    addNewGoods (state, goods) {
        this.state.goods.goodsList.push(goods);
    },
    // 快捷入库
    addOldGoods (state, goods) {
        const goodsList = state.goods.goodsList;
        for (let i = 0, len = goodsList.length; i < len; i++) {
            if (goodsList[i].coding === goods.coding) {
                goodsList[i].number = parseInt(goodsList[i].number, 10) + parseInt(good.number, 10);
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
    }
}