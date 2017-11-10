export default {
    // 将IndexedDB中数据写入vuex
    getData (state, data) {
        state[data.name] = data.result;
    },
    // 设置当前用户
    setCurrUser (state, user) {
        state.currUser = user;
    },
    // 当前用户退出登录
    logoutAccount (state) {
        state.currUser = {
            name: '未登录',
            avatar: ''
        };
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
    // 删除已结算商品，同时减去库存，加上销量
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
                    state.goods.goodsList[z].sales[new Date().getMonth()] += goodsList[i].count;
                    if (state.goods.goodsList[z].number < state.messages.limitNumber) {
                        let message = new Object();
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        let hour = date.getHours();
                        let min = date.getMinutes();
                        function addZero(val) {
                            if (val < 10) {
                                val = '0' + val;
                            } 
                            return val;
                        }
                        message.date = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
                        message.content = '商品：' + state.goods.goodsList[z].name + '，编码：' + state.goods.goodsList[z].coding + '，仅剩 ' + state.goods.goodsList[z].number + ' 件，请尽快补充！';
                        state.messages.messageList.unshift(message);
                        state.messages.number += 1;
                    }
                }
            }
        }
    },
    // 检查商品库存
    checkGoodsNumber (state) {
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].number < state.messages.limitNumber) {
                let message = new Object();
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let min = date.getMinutes();
                function addZero(val) {
                    if (val < 10) {
                        val = '0' + val;
                    } 
                    return val;
                }
                message.date = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
                message.content = '商品：' + state.goods.goodsList[z].name + '，编码：' + state.goods.goodsList[z].coding + '，仅剩 ' + state.goods.goodsList[z].number + ' 件，请尽快补充！';
                state.messages.messageList.unshift(message);
                state.messages.number += 1;
            }
        }
    },
    // 检查商品保质期
    checkGoodsDate (state) {
        let date = new Date();
        let nowTime = date.getTime();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        function addZero(val) {
            if (val < 10) {
                val = '0' + val;
            } 
            return val;
        }
        let today = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
        if (today !== state.messages.today) {
            for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
                let goodsTime = new Date(state.goods.goodsList[i].date).getTime();
                let dateRange = Math.floor((goodsTime - nowTime) / 1000 / 60 / 60 / 24);
                if (dateRange <= state.messages.limitDate) {
                    let message = new Object();
                    message.date = today;
                    message.content = '商品：' + state.goods.goodsList[i].name + '，编码：' + state.goods.goodsList[i].coding + '，保质期仅剩 ' + dateRange + ' 天，请尽快销售或处理！';
                    state.messages.messageList.unshift(message);
                    state.messages.number += 1;
                }
            }
            state.messages.today = today;
        }
    },
    // 重置新消息数字
    resetMessageNumber (state) {
        state.messages.number = 0;
    },
    // 删除消息通知
    deleteMessage (state, index) {
        state.messages.messageList.splice(index, 1);
    },
    // 设置消息通知
    changeMessage (state, newLimit) {
        for (let limit in newLimit) {
            if (newLimit[limit]) {
                state.messages[limit] = newLimit[limit];
            }
        }
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
    },
    // 改变待办事件状态
    changeTodoState (state, time) {
        for (let i = 0, len = state.todo.todoList.length; i < len; i++) {
            if (state.todo.todoList[i].time === time) {
                state.todo.todoList[i].state = '已到期';
                state.todo.todoList[i].cellClassName = {
                    state: 'state-change'
                };
            }
        }
    }
}