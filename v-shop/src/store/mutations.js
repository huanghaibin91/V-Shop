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
    // 详情页商品
    getDetailGoods (state, goods) {
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === goods.coding) {
                state.goods.detailGoods = goods;
            }
        }
    },
    // 删除商品
    deleteGoods (state) {
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === state.goods.detailGoods.coding) {
                state.goods.goodsList.splice(i, 1);
                break;
            }
        }
    },
    // 更改商品信息
    changeGoods (state, newMessage) {
        let goods = null;
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === state.goods.detailGoods.coding) {
                goods = state.goods.goodsList[i];
                break;
            }
        }
        for (let message in newMessage) {
            if (newMessage[message]) {
                goods[message] = newMessage[message];
            }
        }
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
    // 删除已结算商品，同时减去库存
    deleteCheckoutGoods (state, goodsList) {
        for (let i = 0, len = goodsList.length; i < len; i++) {
            for (let j = state.shoppingCart.shoppingCartList.length - 1; j >= 0; j--) {
                if (goodsList[i].coding === state.shoppingCart.shoppingCartList[j].coding) {
                    state.shoppingCart.shoppingCartList.splice(j, 1);
                    state.shoppingCart.number -= 1;
                }
            }
            for (let z = 0, len = state.goods.goodsList.length; z < len; z++) {
                if (goodsList[i].coding === state.goods.goodsList[z].coding) {
                    state.goods.goodsList[z].number -= goodsList[i].count;
                }
            }
        }
    },
    // 检查商品库存
    checkGoodsNumber (state) {

    },
    // 检查商品保质期
    checkGoodsDate (state) {

    },
    // 提交收银记录
    addCashRegister (state, cashRegiter) {
        state.cashRegister.cashRegisterList.unshift(cashRegiter);
    },
    // 添加新待办事件
    addNewTodo (state, todo) {
        state.todo.todoList.unshift(todo);
    },
    // 删除待办事件
    deleteTodo (state, index) {
        state.todo.todoList.splice(index, 1);
    }
}