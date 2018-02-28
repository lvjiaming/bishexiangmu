

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.net.connectServer("ws://192.168.0.18:3010", () => {
            cc.log(`has connect`);
        });
    },

    start () {

    },

    // update (dt) {},
});
