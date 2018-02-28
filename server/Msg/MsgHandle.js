/**
 * Created by Administrator on 2018/2/28.
 */
const msgId = require("../Common/Const");
const MsgHandle = function (target) {
    this.target = target;
};

/**
 *  收到的消息进行处理
 * @param ws 发消息的用户
 * @param data  发的消息
 */
MsgHandle.prototype.handle = (ws, data) => {
    //todo 预定发送的消息为json格式，里面包含msdId和msgData
    const event = data.msgId;
    const msgData = data.msgData;
    console.log(`收到的协议id为：${event}`);
    switch (event) {  // 对收到的消息进行处理
        case msgId.MSG_ID.XXL_LOGIN_IN_REP: {  // 注册
            break;
        }
        case msgId.MSG_ID.XXL_REGSTER_REP: {  // 登录
            break;
        }
    }
};

/**
 *  生成这个类的一个单例
 * @param target 外部传进来的数据
 * @returns {MsgHandler} 返回这个方法的一个实例
 */
module.exports = function (target) {
    if (!this.msgHanele) {
        console.log(`第一次初始化`);
        this.msgHanele = new MsgHandler(target);
    }
    return this.msgHanele;
};