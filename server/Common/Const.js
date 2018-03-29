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

    XXL_SAVE_SCORE_REQ: 5, // 保存分数的请求
    XXL_SAVE_SCORE_REP: 6, // 保存分数的回复

    XXL_UPDATE_SCORE: 7, // 更新分数
};
Const.MSG_STATE = {  // 消息的状态
    SUC: 1, // 成功
    ERR: 2, // 错误
};
module.exports = Const;