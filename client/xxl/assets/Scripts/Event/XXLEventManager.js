
const GameEventManager = require('./GameEventManager.js');
const XXLEventManager = cc.Class({
    extends: GameEventManager,
    statics: {
        getInstance() {  // 单例
            if (!this.XXLEventManager) {
                this.XXLEventManager = new XXLEventManager();
            }
            return this.XXLEventManager;
        },
    },
    /**
     *  连接服务器
     * @param hostStr 需要连接的ip和端口
     * @param callBack  连上服务器之后的回调
     */
    connectServer(hostStr, callBack) {
        cc.log(`XXLEventManager connect`);
        this.connect(hostStr, callBack);
    },
    /**
     *  需要给服务器发送消息的处理
     * @param event 发送的消息id
     * @param data 发送的数据
     */
    startEvent(event, data) {
        cc.log(`发送的协议id为：${event}`);
        switch (event) {

            default: {
                break;
            }
        }
    },
    /**
     *  收到服务器的回复后的处理
     * @param msgId 收到的消息的id
     * @param msgData 收到的数据
     */
    onMsg(msgId, msgData) {
        cc.log(`收到的协议id为：${msgId}`);
        switch (msgId) {

            default: {
                break;
            }
        }
    }
});
cc.net = XXLEventManager.getInstance();
