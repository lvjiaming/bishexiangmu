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
    _ItemArr: null,  //  item的数组(二维数组，左上角为[0][0])
    ctor() {
        this._CurSelectItem = null;
        this._ItemArr = [];
    },
    /**
     *  初始化位置的配置
     */
    initPosConfig() {
        for (let i = 0; i < cc.const.ITEM_OPT.x; i ++) {
            const arr1 = [];
            const pos_y = ((cc.const.ITEM_OPT.y - 1) * cc.const.ITEM_SPACE.y) / 2 - (i * cc.const.ITEM_SPACE.y);
            for (let j = 0; j < cc.const.ITEM_OPT.y; j ++) {
                const pos_x = -((cc.const.ITEM_OPT.x - 1) * cc.const.ITEM_SPACE.x) / 2 + (j * cc.const.ITEM_SPACE.x);
                arr1.push({pos: cc.p(pos_x, pos_y)});
            }
            this._ItemArr.push(arr1);
        }
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
    /**
     *  初始化item
     */
    initItem(node) {
        if (!node) {
            cc.error(`游戏节点未传入`);
            return;
        }
        this._ItemArr.forEach((item1, index1) => {
            item1.forEach((item2, index2) => {
                if (!item2.item) {
                    const nameArr = cc.util.objectToArray(cc.const.ITEM_TYPE);
                    const itemType = nameArr[cc.util.randomInter(0, 5)];
                    const leftResult = this.checkLeft(index2, index1, itemType);
                    const upResult = this.checkUp(index2, index1, itemType);
                    if (leftResult.result && upResult.result) {
                        const itemNode = cc.instantiate(cc.dirRes[itemType]);
                        itemNode.setPosition(item2.pos);
                        itemNode.type = itemType;
                        node.addChild(itemNode);
                        item2.item = itemNode;
                    } else {
                        this.initItem(node);
                    }
                }
            });
        });
    },
    /**
     *  检查左侧的item
     * @param index
     */
    checkLeft(x, y, type) {
        if (x == 0) {
            return {result: true, arr: []};
        }
        let num = 0;
        const arr = [];
        const getNum = (xx, yy, types, arrs) => {
            // cc.log(`处理的数据为：x: ${xx}, y: ${yy}, num: ${num}`);
            if (xx == 0) {
                return;
            }
            if (this._ItemArr[yy][xx - 1].item.type == types) {
                num++;
                arrs.push({x: xx - 1, y: yy});
                getNum(xx - 1, yy, types, arrs)
            }
        };
        getNum(x, y, type, arr);
        // cc.log(`x: ${x}, y: ${y}, num: ${num}, arr: ${arr.length}`);
        if (num >= 2) {
            return {result: false, arr: arr};
        } else {
            return {result: true, arr: arr};
        }
    },
    /**
     *  检查右侧的
     * @param index
     */
    checkRight(x, y, type) {
        if (x == cc.const.ITEM_OPT.x - 1) {
            return {result: true, arr: []};
        }
        let num = 0;
        const arr = [];

        const getNum = (xx, yy, types, arrs) => {
            if (xx == cc.const.ITEM_OPT.x - 1) {
                return;
            }
            if (this._ItemArr[yy][xx + 1].item.type == types) {
                num++;
                arrs.push({x: xx + 1, y: yy});
                getNum(xx + 1, yy, types, arrs)
            }
        };
        getNum(x, y, type, arr);


        if (num >= 2) {
            return {result: false, arr: arr};
        } else {
            return {result: true, arr: arr};
        }
    },
    /**
     *  检查顶部
     * @param index
     */
    checkUp(x, y, type) {
        if (y == 0) {
            return {result: true, arr: []};
        }
        let num = 0;
        const arr = [];

        const getNum = (xx, yy, types, arrs) => {
            if (yy == 0) {
                return;
            }
            if (this._ItemArr[yy - 1][xx].item.type == types) {
                num++;
                arrs.push({x: xx, y: yy - 1});
                getNum(xx, yy - 1, types, arrs)
            }
        };
        getNum(x, y, type, arr);

        if (num >= 2) {
            return {result: false, arr: arr};
        } else {
            return {result: true, arr: arr};
        }
    },
    /**
     * 检查底部
     * @param index
     */
    checkBottom(x, y, type) {
        if (y == cc.const.ITEM_OPT.y - 1) {
            return {result: true, arr: []};
        }
        let num = 0;
        const arr = [];

        const getNum = (xx, yy, types, arrs) => {
            if (yy == cc.const.ITEM_OPT.y - 1) {
                return;
            }
            if (this._ItemArr[yy + 1][xx].item.type == types) {
                num++;
                arrs.push({x: xx, y: yy + 1});
                getNum(xx, yy + 1, types, arrs)
            }
        };
        getNum(x, y, type, arr);

        if (num >= 2) {
            return {result: false, arr: arr};
        } else {
            return {result: true, arr: arr};
        }
    },
    /**
     *  选中一个item，进行判断，是否能消除
     */
    selectItem(item) {
        const curItem = this.getCurSelectItem();
        if (curItem) {
            cc.log(`已经选中一个item，判断此两个item是否挨着的`);

        } else {
            cc.log(`未选中item,设置点击的item未当前选中的item`);
            this.setCurSelectItem(item);
        }
    },

});
cc.gameControl = GameControl.getInstance();