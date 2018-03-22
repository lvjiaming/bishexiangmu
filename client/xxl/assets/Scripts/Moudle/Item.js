
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {

    },

    start () {

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
