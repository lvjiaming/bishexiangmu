

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
        gameUI: {
            default: null,
            type: cc.Node,
            tooltip: "游戏ui",
        },
        gameScore: {
            default: null,
            type: cc.Label,
            tooltip: "游戏得分",
        },
        btnStartGame: {
            default: null,
            type: cc.Node,
            tooltip: "开始游戏按钮",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.commonPop.init(this.node);  // 初始化提示弹窗
        cc.net.addObserver(this);
        cc.log(`昵称为：${cc.user.getNickName()}`);
        this.initInfo();
        this.gameScoreValue = 0;


        // 测试代码
        //this.startGame();
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
            this.nickName.string = `昵称：${cc.user.getNickName()}`;
        }
    },
    /**
     *  更新游戏得分
     * @param score
     */
    updateGameScore(score) {
        if (this.gameScore) {
            this.gameScore.string = `得分：${score}`;
        }
    },
    /**
     *  设置分数
     */
    setScore() {
        if (this.score) {
            this.score.string = `分数：${cc.user.getScore()}`;
        }
    },
    /**
     *  点击开始游戏
     */
    startGame() {
        cc.gameControl.initPosConfig();
        cc.gameControl.initItem(this.gameNode);
        this.gameScoreValue = 0;
        this.updateGameScore(this.gameScoreValue);
        if (this.btnStartGame) {  // 隐藏开始游戏的按钮
            this.btnStartGame.active = false;
        }
        if (this.gameUI) {  // 将游戏分数，保存游戏。结束游戏按钮显示
            this.gameUI.active = true;
        }
    },
    /**
     *  清空游戏的界面
     */
    cleanGameUi() {
        this.gameNode.removeAllChildren();
        if (this.gameUI) {  // 将游戏分数，保存游戏。结束游戏按钮隐藏
            this.gameUI.active = false;
        }
        if (this.btnStartGame) {  // 显示开始游戏的按钮
            this.btnStartGame.active = true;
        }
    },
    /**
     *  点击游戏结束
     */
    onGameOver() {
        this.cleanGameUi();
    },
    /**
     *  点击保存分数
     */
    onSaveScore() {
        cc.net.startEvent(cc.const.MSG_ID.XXL_SAVE_SCORE_REQ, {score: this.gameScoreValue});
    },


    onEventMessage(event, data) {
        cc.log(`收到的协议为：${event}`);
        switch (event) {
            case cc.const.MSG_ID.XXL_SAVE_SCORE_REP: {  // 保存分数的回复
                cc.commonPop.show(data.msg, 2);
                break;
            }
            case cc.const.MSG_ID.XXL_UPDATE_SCORE: {  // 更新分数
                cc.user.setScore(data.score);
                this.setScore();
                break;
            }
            case "addScore": {  // 自定义事件，增加游戏得分
                this.gameScoreValue = this.gameScoreValue + parseInt(data.score);
                this.updateGameScore(this.gameScoreValue);
                break;
            }
            default: {
                break;
            }
        }
    },

});
