

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.net.connectServer("ws://127.0.0.1:30011", () => {
            cc.log(`has connect`);
        });
    },

    start () {

    },


});
