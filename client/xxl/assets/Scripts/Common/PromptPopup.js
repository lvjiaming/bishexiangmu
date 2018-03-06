

cc.Class({
    extends: cc.Component,

    properties: {
        noteLabel: {
            default: null,
            type: cc.Label,
            tooltip: "显示内容的节点",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },
    /**
     *  设置显示内容
     * @param note
     */
    setNode(note) {
        if (this.noteLabel) {
            this.noteLabel.string = note;
        }
    },

    onCloseClick() {
        this.node.stopAllActions();
        this.node.destroy();
    },

    // update (dt) {},
});
