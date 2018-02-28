
const EventManager = require('./EventManager');
const GameEventManager = cc.Class({
    extends: EventManager,
    gameSocket: null,
    // statics: {
    //     getInstance() {
    //         if (!this.gameEventManager) {
    //             this.gameEventManager = new GameEventManager();
    //         }
    //         return this.gameEventManager;
    //     },
    // },
    /**
     *  构造函数
     */
    ctor() {
        this.gameSocket = null;
    },
    /**
     *  连接服务器，已经监听服务器一系列事件
     */
    connect(hostStr, callBack) {
        const self = this;
        this.gameSocket = new WebSocket(hostStr);
        this.gameSocket.onopen = () => {  // 坚听到这个函数，说明已经连上服务器了
            cc.log(`websocket has connect`);
            callBack();
        };
        this.gameSocket.onerror = () => {  // 监听到这个函数，说明连接过程出现错误
            cc.log(`websocket connect error`);
        };
        this.gameSocket.onclose = () => { // 这个函数说明连上服务器后，服务器关闭了
            cc.log(`websocket has close`);
        };
        this.gameSocket.onmessage = function (data) {  // 这个函数接受服务器给客户端的消息和数据
            data = JSON.parse(data.data);
            self.onMsg(data.msgId, data.msgData);
        };
        this.gameSocket.sendMessage = (msgId, msgData) => {  // 这个方法用于给服务器发送请求
            if (this.gameSocket.readyState === WebSocket.OPEN) {
                this.gameSocket.send(JSON.stringify({msgId: msgId, msgData: msgData}));
            } else {
                cc.error(`websocket connect error: ${this.gameSocket.readyState}`);
            }
        };
    },
    /**
     *  发送消息给服务端
     * @param msgId 消息的id
     * @param msgData 消息的数据
     */
    sendMessage(msgId, msgData) {
        if (msgData === null || msgData === undefined) {
            msgData = null;
        }
        this.gameSocket.sendMessage(msgId, msgData);
    },
    /**
     *  关闭与服务器的连接(客户端主动断开)
     */
    close() {
        this.gameSocket.close();
    },
});
