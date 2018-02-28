
const GameEventManager = require('./GameEventManager.js');
const XXLEventManager = cc.Class({
    extends: GameEventManager,
    statics: {
        getInstance() {
            if (!this.XXLEventManager) {
                this.XXLEventManager = new XXLEventManager();
            }
            return this.XXLEventManager;
        },
    },
    connectServer(hostStr, callBack) {
        cc.log(`XXLEventManager connect`);
        this.connect(hostStr, callBack);
    },
    startEvent(event, data) {
        cc.log(`发送的协议id为：${event}`);
        switch (event) {

            default: {
                break;
            }
        }
    },
    onMsg(msgId, msgData) {
        cc.log(`收到的协议id为：${msgId}`);
        switch (msgId) {

            default: {
                break;
            }
        }
    }
});
XXLEventManager.Event = {
    EVENT_LOGIN_REQ: 1,
    EVENT_LOGIN_REP: 2,
    EVENT_ENTER_ROOM_REQ: 3,
    EVENT_ENTER_ROOM_REP: 4,
    EVENT_LEAVE_ROOM_REQ: 5,
    EVENT_LEAVE_ROOM_REP: 6,
    EVENT_SEND_MEG_REQ: 7,
    EVENT_SEND_MEG_REP: 8,
    EVENT_MESSAGE_PUSH: 9,  //  大厅服务器推送的消息
    EVENT_CREATE_ROOM_REQ: 10, //  创建房间
    EVENT_CREATE_ROOM_REP: 11, //  创建房间回复
    USER_ENTER_ROOM_PUSH: 12,  //  有玩家加入的推送
    USER_LEAVE_ROOM_PUSH: 13,  //  有玩家离开房间的推送
};
cc.net = XXLEventManager.getInstance();
