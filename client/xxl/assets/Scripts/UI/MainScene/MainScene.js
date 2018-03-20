

cc.Class({
    extends: cc.Component,

    properties: {
        nickName: {
            default: null,
            type: cc.Label,
            tooltip: "名字",
        },
        score:{
            default: null,
            type: cc.Label,
            tooltip: "分数",
        },
        gameNode: {
            default: null,
            type: cc.Node,
            tooltip: "游戏节点",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.commonPop.init(this.node);  // 初始化提示弹窗
        cc.net.addObserver(this);
        cc.log(`昵称为：${cc.user.getNickName()}`);
        this.initInfo();
        cc.gameControl.initPosConfig();

        // 测试代码
        this.startGame();
    },

    onDestroy() {
        cc.net.removeObserver(this);
    },

    start () {

    },
    /**
     * 初始化信息
     */
    initInfo() {
        this.setNickName();
        this.setScore();
    },
    /**
     *  设置昵称
     */
    setNickName() {
        if (this.nickName) {
            this.nickName.string = cc.user.getNickName();
        }
    },
    /**
     *  设置分数
     */
    setScore() {
        if (this.score) {
            this.score.string = cc.user.getScore();
        }
    },
    /**
     *  开始游戏
     */
    startGame() {
        cc.gameControl.initItem(this.gameNode);
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
