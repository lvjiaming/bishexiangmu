

cc.Class({
    extends: cc.Component,

    properties: {
        nickNameLabel: {
            default: null,
            type: cc.EditBox,
            tooltip: "用户名",
        },
        passWordLabel: {
            default: null,
            type: cc.EditBox,
            tooltip: "密码",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.net.connectServer("ws://127.0.0.1:30011", () => {
            cc.log(`has connect`);
        });
        cc.net.addObserver(this);  // 添加观察者
    },

    start () {

    },

    /**
     *  登录按钮
     */
    onLoginInClick() {
        cc.log(`登录`);
        const data = {};
        if (this.nickNameLabel && this.nickNameLabel.string) {
            data.nickname = this.nickNameLabel.string;
        } else {
            cc.log(`数据有问题`);
            return;
        }
        if (this.passWordLabel && this.passWordLabel.string) {
            data.password = this.passWordLabel.string;
        } else {
            cc.log(`数据有问题`);
            return;
        }
       cc.net.startEvent(cc.const.MSG_ID.XXL_LOGIN_IN_REP, data);
    },
    /**
     *  注册的按钮
     */
    onRegisterClick() {
        cc.log(`注册`);
        const data = {};
        if (this.nickNameLabel && this.nickNameLabel.string) {
            data.nickname = this.nickNameLabel.string;
        } else {
            cc.log(`数据有问题`);
            return;
        }
        if (this.passWordLabel && this.passWordLabel.string) {
            data.password = this.passWordLabel.string;
        } else {
            cc.log(`数据有问题`);
            return;
        }
        cc.net.startEvent(cc.const.MSG_ID.XXL_REGSTER_REP, data);
    },

    /**
     *  监听的事件
     * @param event 协议id
     * @param data 数据
     */
    onEventMessage(event, data) {
        cc.log(`收到的协议为：${event}`);
        switch (event) {
            case cc.const.MSG_ID.XXL_REGSTER_REQ: {  // 注册的回复
                if (data.code == cc.const.MSG_STATE.ERR) {
                    cc.log(`注册失败： ${data.errmsg}`);
                } else {
                    cc.log(`注册成功`);
                }
                break;
            }
            case cc.const.MSG_ID.XXL_LOGIN_IN_REQ: { // 登录的回复
                if (data.code == cc.const.MSG_STATE.ERR) {
                    cc.log(`登录失败： ${data.errmsg}`);
                } else {
                    cc.log(`登录成功`);
                }
                break;
            }
            default: {
                break;
            }
        }
    },

});
