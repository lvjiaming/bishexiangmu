

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.net.addObserver(this);
        cc.log(`昵称为：${cc.user.getNickName()}`);
    },

    onDestroy() {
        cc.net.removeObserver(this);
    },

    start () {

    },

    onEventMessage(event, data) {
        cc.log(`收到的协议为：${event}`);
        switch (event) {
            default: {
                break;
            }
        }
    },

});
