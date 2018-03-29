
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {

    },

    start () {

    },
    onDestroy() {

        switch (this.node.type) {
            case cc.const.ITEM_TYPE.ITEM_BEAR: {
                cc.net.notifyEvent("addScore", {score: cc.const.ITEM_SCORE.ITEMBEAR});
                break;
            }
            case cc.const.ITEM_TYPE.ITEM_CAT: {
                cc.net.notifyEvent("addScore", {score: cc.const.ITEM_SCORE.ITEMCAT});
                break;
            }
            case cc.const.ITEM_TYPE.ITEM_CHICKEN: {
                cc.net.notifyEvent("addScore", {score: cc.const.ITEM_SCORE.ITEMCHICKEN});
                break;
            }
            case cc.const.ITEM_TYPE.ITEM_FOX: {
                cc.net.notifyEvent("addScore", {score: cc.const.ITEM_SCORE.ITEMFOX});
                break;
            }
            case cc.const.ITEM_TYPE.ITEM_FROG: {
                cc.net.notifyEvent("addScore", {score: cc.const.ITEM_SCORE.ITEMFROG});
                break;
            }
            case cc.const.ITEM_TYPE.ITEM_HORSE: {
                cc.net.notifyEvent("addScore", {score: cc.const.ITEM_SCORE.ITEMHORSE});
                break;
            }
        }
    },
    /**
     *  点击
     */
    onItemClick() {
        if (cc.gameControl.getIsCanClick()) {
            cc.gameControl.selectItem(this.node);
        } else {
            cc.log(`不能点击`);
        }
    },

    // update (dt) {},
});
