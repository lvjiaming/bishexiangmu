/**
 *  游戏控制中心
 * @type {Function}
 */
const GameControl = cc.Class({
    statics: {
        getInstance() {
            if (!this.control) {
                this.control = new GameControl();
            }
            return this.control;
        },
    },
    _CurSelectItem: null,  // 当前选中的item
    ctor() {
        this._CurSelectItem = null;
    },
    /**
     *  设置当前选中的item
     * @param item
     */
    setCurSelectItem(item) {
        this._CurSelectItem = item;
    },
    /**
     *  获取当前选中的item
     * @returns {null}
     */
    getCurSelectItem() {
        return this._CurSelectItem;
    },

});