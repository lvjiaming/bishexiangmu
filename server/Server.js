/**
 * Created by Administrator on 2018/2/28.
 */
const webSocket = require("ws");  // npm里自带的webSocket模块

const MsgHandle = require("./Msg/MsgHandle");

const wsServer = new webSocket.Server({   //  设置ip 和 port
    host: "192.168.0.18",
    port: 10001
});
this.UserList = [];  //  用户列表（里面包含nickName, 密码, ws等信息）
console.log(`1111`);
wsServer.on('connection', (ws) => {  //  注册连接上的事件
    console.log(`one client has connected`);
    ws.on('message', (message) => {  //  接收客户端的消息
        console.log(`get message: ${message}`);
        MsgHandle(this).handle(ws, JSON.parse(message));
    });
    ws.on('close', () => {  // 用户断开连接事件
        console.log(`one user has close connection`);
        const user = this.getUserByWs(ws);
        if (user) {
            console.log(`玩家：${user.nickname}离线`);
            user.online = false;
        }
    });
});
wsServer.on('error', (err) => {  // 连接错误的事件
    console.log(`server has error: ${err}`);
});
wsServer.on('close', (ws) => {  // 服务器关闭的事件
    console.log(`server has close`);
});

/**
 *  获取指定玩家(根据用户名)
 * @param nickname
 */
this.getUser = function (nickname) {
    let user;
    this.UserList.forEach((item) => {
        if (item.nickname === nickname) {
            user = item;
        }
    });
    if (user) {
        console.log(`获取玩家${nickname}`);
    }
    return user;
};
/**
 *  获取指定玩家（根据ws）
 * @param ws
 * @returns {*}
 */
this.getUserByWs = function (ws) {
    let user;
    this.UserList.forEach((item) => {
        if (item.ws === ws) {
            user = item;
        }
    });
    return user;
};
/**
 *  添加玩家
 * @param ws
 * @param data
 */
this.addUser = function (user) {
    this.UserList.push(user);
};
/**
 *  移除玩家
 * @param ws
 */
this.removeUser = function (ws) {
    this.UserList.forEach((user, index) => {
        if (user.ws === ws) {
            this.UserList.splice(index, 1);
            console.log(`将玩家${user.nickName}移除,UserList.length = ${this.UserList.length}`);
        }
    });
};
