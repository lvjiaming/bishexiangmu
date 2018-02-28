/**
 * Created by Administrator on 2018/2/28.
 */
const webSocket = require("ws");  // npm里自带的webSocket模块

const MsgHandle = require("./Msg/MsgHandle");

const wsServer = new webSocket.Server({   //  设置ip 和 port
    host: "192.168.0.18",
    port: 3010
});
this.UserList = [];  //  用户列表（里面包含nickName, ws）
console.log(`1111`);
wsServer.on('connection', (ws) => {  //  注册连接上的事件
    console.log(`one client has connected`);
    ws.on('message', (message) => {  //  接收客户端的消息
        console.log(`get message: ${message}`);
        MsgHandle(this).handle(ws, JSON.parse(message));
    });
    ws.on('close', () => {  // 用户断开连接事件
        console.log(`one user has close connection`);
    });
});
wsServer.on('error', (err) => {  // 连接错误的事件
    console.log(`server has error: ${err}`);
});
wsServer.on('close', (ws) => {  // 服务器关闭的事件
    console.log(`server has close`);
});

/**
 *  获取指定玩家
 * @param ws
 */
this.getUser = function (ws) {
    let user;
    this.UserList.forEach((item) => {
        if (item.ws === ws) {
            user = item;
        }
    });
    console.log(`获取玩家${user.nickName}`);
    return user;
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
