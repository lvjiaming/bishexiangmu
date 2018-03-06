/**
 *  公用的提示弹窗管理器
 * @type {Function}
 */
const CommonPopup = cc.Class({
    statics: {
        getInstance() {
            if (!this.commonPopup) {
                this.commonPopup = new CommonPopup();
            }
            return this.commonPopup;
        },
    },
    _ownNode: null,  // 添加节点的父节点
    /**
     *  构造函数
     */
    ctor() {
        this._ownNode = null;
    },
    /**
     *  初始化函数（需要添加在场景时必须初始化）
     * @param node
     */
    init(node) {
        this._ownNode = node;
    },
    /**
     *  显示
     * @param note 显示内容
     * @param time 此参数传了，将在指定时间内自动关闭提示消息
     */
    show(note, time) {
        if (!this._ownNode) {
            cc.log(`未进行初始化！！`);
            return;
        }
        this.hide();
        cc.loader.loadRes("Prefabs/PromptPopup", (err, prefab) => {
            if (err) {
                cc.log(`error: ${err}`)
            } else {
                const popup = cc.instantiate(prefab);
                popup.getComponent("PromptPopup").setNode(note);
                this._ownNode.addChild(popup);
                if (time) {
                    popup.runAction(cc.sequence(cc.delayTime(parseInt(time)), cc.callFunc(() => {
                        this.hide();
                    })));
                }
            }
        });
    },
    /**
     *  关闭提示消息
     */
    hide() {
        if (!this._ownNode) {
            cc.log(`未初始化`);
            return;
        }
        const popup = this._ownNode.getChildByName("PromptPopup");
        if (popup) {
            popup.stopAllActions();
            popup.destroy();
        }
    },
});
cc.commonPop = CommonPopup.getInstance();