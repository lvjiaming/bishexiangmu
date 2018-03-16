/**
 * Created by Administrator on 2018/2/28.
 */

const Const = {

};
Const.MSG_ID = {  // 消息的枚举
    XXL_REGSTER_REP: 1, // 注册的请求
    XXL_REGSTER_REQ: 2, // 注册的回复
    XXL_LOGIN_IN_REP: 3, // 登录的请求
    XXL_LOGIN_IN_REQ: 4, // 登录的回复
};
Const.MSG_STATE = {  // 消息的状态
    SUC: 1, // 成功
    ERR: 2, // 错误
};
// item的横竖数量
Const.ITEM_OPT = {
    x: 8,
    y: 8
};
// 每个item间的间隔
Const.ITEM_SPACE = {
    x: 67,
    y: 67,
};
// item的类型
Const.ITEM_TYPE = {
    ITEM_BEAR: "ITEMBEAR",
    ITEM_CAT: "ITEMCAT",
    ITEM_CHICKEN: "ITEMCHICKEN",
    ITEM_FOX: "ITEMFOX",
    ITEM_FROG: "ITEMFROG",
    ITEM_HORSE: "ITEMHORSE",
};
cc.const = Const;