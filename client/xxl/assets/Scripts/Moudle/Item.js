
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
        cc.gameControl.selectItem(this.node);
    },

    // update (dt) {},
});
