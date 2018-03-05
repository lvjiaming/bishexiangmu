/**
 * Created by Administrator on 2018/2/28.
 */
const msgId = require("../Common/Const");
const WebSocket = require('ws');
const MsgHandle = function (target) {
    this.target = target;
};

/**
 *  收到的消息进行处理
 * @param ws 发消息的用户
 * @param data  发的消息
 */
MsgHandle.prototype.handle = function(ws, data) {
    //todo 预定发送的消息为json格式，里面包含msdId和msgData
    const event = data.msgId;
    const msgData = data.msgData;
    console.log(`收到的协议id为：${event}`);
    switch (event) {  // 对收到的消息进行处理
        case msgId.MSG_ID.XXL_LOGIN_IN_REP: {  // 登录
            this.checkLogin(ws, msgData);
            break;
        }
        case msgId.MSG_ID.XXL_REGSTER_REP: {  // 注册
            this.registerUser(ws, msgData);
            break;
        }
    }
};
/**
 *  检测登录是否成功
 */
MsgHandle.prototype.checkLogin = function(ws,data) {
    const user = this.target.getUser(ws);
    if (user) {
        console.log(`获取到了用户信息`);
        if (user.password === data.password) {
            if (user.online) {
                console.log(`用户已处于登录状态，重复登录`);
            } else {
                const body = sucBody(msgId.MSG_ID.XXL_LOGIN_IN_REQ);
                body.msgData.nickname = user.nickname;
                user.online = true;
                sendMsg(ws, body);
            }
        } else {
            console.log(`密码不正确！！`);
            const body = errBody(msgId.MSG_ID.XXL_LOGIN_IN_REQ, "密码不正确！！！");
            sendMsg(ws, body);
        }
    } else {
        console.log(`用户不存在！！`);
        const body = errBody(msgId.MSG_ID.XXL_LOGIN_IN_REQ, "用户不存在！！！");
        sendMsg(ws, body);
    }
};
/**
 *  注册用户
 * @param ws
 */
MsgHandle.prototype.registerUser = function (ws, data) {
    let has = false;
    this.target.UserList.forEach((item) => {
        if (item.nickname === data.nickname) {
            has = true;
        }
    });
    if (has) {
        const body = errBody(msgId.MSG_ID.XXL_REGSTER_REQ, "用户名已存在");
        sendMsg(ws, body);
    } else {
        const user = {};
        user.ws = ws;
        user.nickname = data.nickname;
        user.password = data.password;
        user.online = false;
        this.target.addUser(user);
        const body = sucBody(msgId.MSG_ID.XXL_REGSTER_REQ);
        sendMsg(ws, body);
    }
};
/**
 *  单发消息
 * @param ws
 * @param data
 */
const sendMsg = function (ws, data) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
};

const errBody = function (id, str) {
    const body = {
        msgId: id,
        msgData: {
            code: msgId.MSG_STATE.ERR,
            errmsg: str,
        },
    }
    return body;
};

const sucBody = function (id) {
    const body = {
        msgId: id,
        msgData: {
            code: msgId.MSG_STATE.SUC,
        },
    }
    return body;
};

/**
 *  生成这个类的一个单例
 * @param target 外部传进来的数据
 * @returns {MsgHandler} 返回这个方法的一个实例
 */
module.exports = function (target) {
    if (!this.msgHanele) {
        console.log(`第一次初始化`);
        this.msgHanele = new MsgHandle(target);
    }
    return this.msgHanele;
};