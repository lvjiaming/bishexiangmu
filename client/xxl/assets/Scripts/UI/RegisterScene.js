

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
        cc.commonPop.init(this.node);  // 初始化提示弹窗
        cc.net.connectServer("ws://127.0.0.1:30011", () => {  // 连接服务器
            cc.log(`has connect`);
        });
        cc.net.addObserver(this);  //  添加观察者
    },

    onDestroy() {
        cc.net.removeObserver(this);  // 移除观察者
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
            cc.commonPop.show("用户名不能为空", 3);
            return;
        }
        if (this.passWordLabel && this.passWordLabel.string) {
            data.password = this.passWordLabel.string;
        } else {
            cc.commonPop.show("密码不能为空", 3);
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
            cc.commonPop.show("用户名不能为空", 3);
            return;
        }
        if (this.passWordLabel && this.passWordLabel.string) {
            data.password = this.passWordLabel.string;
        } else {
            cc.commonPop.show("密码不能为空", 3);
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
                    // cc.log(`注册失败： ${data.errmsg}`);
                    cc.commonPop.show(`注册失败： ${data.errmsg}`, 3);
                } else {
                    // cc.log(`注册成功`);
                    cc.commonPop.show("注册成功", 2);
                }
                break;
            }
            case cc.const.MSG_ID.XXL_LOGIN_IN_REQ: { // 登录的回复
                if (data.code == cc.const.MSG_STATE.ERR) {
                    // cc.log(`登录失败： ${data.errmsg}`)
                    cc.commonPop.show(`登录失败： ${data.errmsg}`, 3);
                } else {
                    // cc.log(`登录成功`);
                    cc.commonPop.show("登录成功", 2);
                    cc.user.setNickName(data.nickname);
                    cc.director.loadScene("MainScene.fire");
                }
                break;
            }
            default: {
                break;
            }
        }
    },

});
