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
    _GameNode: null,  // 游戏节点，会在游戏初始化赋予
    _CurSelectItem: null,  // 当前选中的item
    _ItemArr: null,  //  item的数组(二维数组，左上角为[0][0])
    _IsCanClick: null,  // 标记item是否能点击
    ctor() {
        this._CurSelectItem = null;
        this._ItemArr = [];
        this._IsCanClick = true;
        this._GameNode = null;
    },
    /**
     *  初始化位置的配置
     */
    initPosConfig() {
        this._ItemArr = [];
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
        if (this._CurSelectItem) {
            this._CurSelectItem.color = cc.color(255, 255, 255, 255)
        }
        this._CurSelectItem = item;
        if (this._CurSelectItem) {
            this._CurSelectItem.color = cc.color(173, 173, 173, 255);
        }
    },
    /**
     *  获取当前选中的item
     * @returns {null}
     */
    getCurSelectItem() {
        return this._CurSelectItem;
    },
    /**
     *  设置Item是否能点击
     */
    setIsCanClick(state) {
        this._IsCanClick = state;
    },
    /**
     *  获取是否能点击
     */
    getIsCanClick() {
        return this._IsCanClick;
    },
    /**
     *  初始化item
     */
    initItem(node) {
        if (!node) {
            cc.error(`游戏节点未传入`);
            return;
        }
        this._GameNode = node;
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
                        itemNode.zuobiao = {x: index2, y: index1};  // 绑定坐标
                        itemNode.type = itemType; // 绑定类型
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
            if (Math.abs(curItem.zuobiao.x - item.zuobiao.x) <= 1 &&
                Math.abs(curItem.zuobiao.y - item.zuobiao.y) <= 1 &&
                Math.abs(curItem.zuobiao.y - item.zuobiao.y) != Math.abs(curItem.zuobiao.x - item.zuobiao.x)) {
                cc.log(`是相邻的两个item`);
                this.setCurSelectItem(null);
                this.setIsCanClick(false);
                const result = this.checkCanClean(curItem, item);
                if (result.res) {
                    cc.log(`做可以被消除的处理`);

                    // 交换坐标
                    const centerZuoBiao = curItem.zuobiao;
                    curItem.zuobiao = item.zuobiao;
                    item.zuobiao = centerZuoBiao;
                    this.canCleanAni(curItem, item, result.cleanArr)
                } else {
                    cc.log(`做不能被消除的处理`);
                    this.canNotCleanAni(curItem, item);
                }
            } else {
                cc.log(`不是相邻的两个item`);
                this.setCurSelectItem(item);
            }
        } else {
            cc.log(`未选中item,设置点击的item未当前选中的item`);
            this.setCurSelectItem(item);
        }
    },
    /**
     *  检查是否能消除
     * @param item1
     * @param item2
     */
    checkCanClean(item1, item2) {

        // 两个item交换
        const center = this._ItemArr[item1.zuobiao.y][item1.zuobiao.x].item;
        this._ItemArr[item1.zuobiao.y][item1.zuobiao.x].item = this._ItemArr[item2.zuobiao.y][item2.zuobiao.x].item
        this._ItemArr[item2.zuobiao.y][item2.zuobiao.x].item = center;

        // 检查item1
        const resultLeft1 = this.checkLeft(item2.zuobiao.x, item2.zuobiao.y, item1.type);
        const resultRight1 = this.checkRight(item2.zuobiao.x, item2.zuobiao.y, item1.type);
        const resultUp1 = this.checkUp(item2.zuobiao.x, item2.zuobiao.y, item1.type);
        const resultBottom1 = this.checkBottom(item2.zuobiao.x, item2.zuobiao.y, item1.type);
        const cleanArr = [];  // 需要清除的数组
        const result = {}; // 结果
        let selfItem1 = null;
        let selfItem2 = null;
        if (resultLeft1.arr.length + resultRight1.arr.length >= 2) {
            cleanArr.push(resultLeft1.arr);
            cleanArr.push(resultRight1.arr);
            selfItem1 = item1;
        }
        if (resultUp1.arr.length + resultBottom1.arr.length >= 2) {
            cleanArr.push(resultUp1.arr);
            cleanArr.push(resultBottom1.arr);
            selfItem1 = selfItem1 ? selfItem1 : item1;
        }
        // 检查item2
        const resultLeft2 = this.checkLeft(item1.zuobiao.x, item1.zuobiao.y, item2.type);
        const resultRight2 = this.checkRight(item1.zuobiao.x, item1.zuobiao.y, item2.type);
        const resultUp2 = this.checkUp(item1.zuobiao.x, item1.zuobiao.y, item2.type);
        const resultBottom2 = this.checkBottom(item1.zuobiao.x, item1.zuobiao.y, item2.type);
        if (resultLeft2.arr.length + resultRight2.arr.length >= 2) {
            cleanArr.push(resultLeft2.arr);
            cleanArr.push(resultRight2.arr);
            selfItem2 = item2;
        }
        if (resultUp2.arr.length + resultBottom2.arr.length >= 2) {
            cleanArr.push(resultUp2.arr);
            cleanArr.push(resultBottom2.arr);
            selfItem2 = selfItem2 ? selfItem2 : item2;
        }

        if (selfItem1 || selfItem2) {
            cc.log(`可以被消除`);
            const retArr = [];
            cleanArr.forEach((arr) => {
                arr.forEach((im) => {
                    retArr.push(this._ItemArr[im.y][im.x].item);
                });
            });
            if (selfItem1) {
                retArr.push(selfItem1);
            }
            if (selfItem2) {
                retArr.push(selfItem2);
            }
            result.res = true;
            result.cleanArr = retArr;
            return result;
        } else {
            cc.log(`不能被消除`);
            // 将前面交换的换回来
            const center = this._ItemArr[item1.zuobiao.y][item1.zuobiao.x].item;
            this._ItemArr[item1.zuobiao.y][item1.zuobiao.x].item = this._ItemArr[item2.zuobiao.y][item2.zuobiao.x].item
            this._ItemArr[item2.zuobiao.y][item2.zuobiao.x].item = center;

            result.res = false;
            return result;
        }
    },
    /**
     *  不能消除的动画
     */
    canNotCleanAni(item1, item2) {
        const func = (node1, node2) => {
            const moveAni1 = cc.moveTo(0.3, this._ItemArr[node2.zuobiao.y][node2.zuobiao.x].pos);
            const del = cc.delayTime(0.1);
            const moveAni2 = cc.moveTo(0.3, this._ItemArr[node1.zuobiao.y][node1.zuobiao.x].pos);
            node1.runAction(cc.sequence(moveAni1, del, moveAni2, cc.callFunc(() => {
                if (!this.getIsCanClick()) {
                    this.setIsCanClick(true);
                }
            })));
        };
        func(item1, item2);
        func(item2, item1);
    },
    /**
     * 能消除的动画
     * @param item1
     * @param item2
     */
    canCleanAni(item1, item2, arr) {
        // 保存清除的item的坐标
        const newArr = [];
        arr.forEach((item) => {
            newArr.push({x: item.zuobiao.x, y: item.zuobiao.y});
        });
        // 做清除的动作，并将需要清除的item销毁掉
        item1.runAction(cc.moveTo(0.3, this._ItemArr[item1.zuobiao.y][item1.zuobiao.x].pos));
        item2.runAction(cc.sequence(cc.moveTo(0.3, this._ItemArr[item2.zuobiao.y][item2.zuobiao.x].pos), cc.callFunc(() => {
            arr.forEach((cleanItem) => {
                this._ItemArr[cleanItem.zuobiao.y][cleanItem.zuobiao.x].item = null;
                cleanItem.destroy();
            });
            this.complementNullItem(newArr);
            // this.setIsCanClick(true);
        })));
    },
    /**
     *  检测数组中是否存在此元素，存在zuobiao的x值一样，则，比较与之相同的元素，讲zuobiao的y值最大的放入，不存在，则，直接放入数组
     * @param arr
     * @param item
     */
    checkArrHasItem(arr, item) {
        let has = false;
        arr.forEach((items, index) => {
            if (items.x == item.x) {
                has = true;
                if (items.y < item.y) {
                    arr[index] = item;
                }
            }
        });
        if (has == false) {
            arr.push(item);
        }
    },
    /**
     *  补足空的item
     */
    complementNullItem(arr) {

        // 去压缩清除的item数组
        const newArr = [];
        arr.forEach((item) => {
            this.checkArrHasItem(newArr, item);
        });
        newArr.forEach((item) => {
            let zuobiao_y = null;
            for (let i = item.y; i >= 0; i --) {  // 寻找离被消除的这个item最近的一个item
                if (this._ItemArr[i][item.x].item) {
                    zuobiao_y = i;
                    break;
                }
            }
            if (zuobiao_y === null) {  // 此时说明被消除的这个item上面已没有item
                zuobiao_y = -1;
            }

            const moveArr = [];  // 需要移动的item数组
            const newItemNum = item.y - zuobiao_y;  // 需要重新生成item的个数
            cc.log(`位置{x: ${item.x}, y: ${item.y}}, 需要生成节点数目：${newItemNum}`);
            if (zuobiao_y != -1) { // 找到被消除的那个item上方同一列的item，放入需要执行移动动画的数组
                for (let i = zuobiao_y; i >= 0; i --) {
                    if (this._ItemArr[i][item.x].item) {
                        this._ItemArr[i + newItemNum][item.x].item = this._ItemArr[i][item.x].item;
                        this._ItemArr[i + newItemNum][item.x].item.zuobiao = {x: item.x, y: i + newItemNum};
                        moveArr.push(this._ItemArr[i + newItemNum][item.x].item);
                    }
                }
            }
            // 生成需要补足的item
            for (let i = 0; i < newItemNum; i ++) {
                const itemNode = this.createOneItem(cc.p(this._ItemArr[item.y][item.x].pos.x,
                    this._ItemArr[0][item.x].pos.y + (i + 1) * cc.const.ITEM_SPACE.y), {x: item.x, y: newItemNum - i - 1});
                moveArr.push(itemNode);  //  将这些重新生成的item也放入需要执行移动动画的数组
            }
            this.moveItemArr(moveArr); // 执行移动
        });
    },
    /**
     *  生成一个item
     * @param pos
     */
    createOneItem(pos, zuobiao) {
        const nameArr = cc.util.objectToArray(cc.const.ITEM_TYPE);
        const itemType = nameArr[cc.util.randomInter(0, 5)];

        const itemNode = cc.instantiate(cc.dirRes[itemType]);
        itemNode.setPosition(pos);
        itemNode.zuobiao = zuobiao;  // 绑定坐标
        itemNode.type = itemType; // 绑定类型
        this._GameNode.addChild(itemNode);
        this._ItemArr[zuobiao.y][zuobiao.x].item = itemNode;
        return itemNode;
    },
    /**
     *  移动item
     */
    moveItemArr(arr) {
        arr.forEach((item) => {  // 执行移动
            item.runAction(cc.moveTo(0.3, this._ItemArr[item.zuobiao.y][item.zuobiao.x].pos));
        });
        // 测试代码
        // this.scheduleOnce(() => {
        //
        // }, 0.4);
        setTimeout(() => {  // 做判断是否移动的item存在能消除的item的循环操作
            const newArr = [];
            const desArr = [];
            let canClick = true;
            arr.forEach((item) => {  // 找到移动的那些item，并去判断移动后存不存在可以消除的item，能消除的放在desArr数组中
                const result = this.checkSingleItem(item);
                if (result.res) {
                    cc.log(`做可以被消除的处理`);
                    result.cleanArr.forEach((items) => {
                        this.checkIsSameItem(desArr, items);
                    });
                    canClick = false;
                }
            });
            desArr.forEach((item) => {  // 将能消除的item销毁掉，并重复，移动，并判断移动的item是否能消除，并补空缺的操作
                if (this._ItemArr[item.zuobiao.y][item.zuobiao.x].item) {
                    newArr.push({x: item.zuobiao.x, y: item.zuobiao.y});
                    this._ItemArr[item.zuobiao.y][item.zuobiao.x].item = null;
                    item.destroy();
                }
            });
            this.complementNullItem(newArr);  // 补空缺
            if (canClick) {  // 当不存在可销毁的item时，将item可点击打开
                this.setIsCanClick(true);
            }
        }, 400);
    },
    /**
     *  检查单个的item
     */
    checkSingleItem(item) {
        const resultLeft1 = this.checkLeft(item.zuobiao.x, item.zuobiao.y, item.type);
        const resultRight1 = this.checkRight(item.zuobiao.x, item.zuobiao.y, item.type);
        const resultUp1 = this.checkUp(item.zuobiao.x, item.zuobiao.y, item.type);
        const resultBottom1 = this.checkBottom(item.zuobiao.x, item.zuobiao.y, item.type);
        const cleanArr = [];  // 需要清除的数组
        const result = {}; // 结果
        let selfItem1 = null;
        if (resultLeft1.arr.length + resultRight1.arr.length >= 2) {
            cleanArr.push(resultLeft1.arr);
            cleanArr.push(resultRight1.arr);
            selfItem1 = item;
        }
        if (resultUp1.arr.length + resultBottom1.arr.length >= 2) {
            cleanArr.push(resultUp1.arr);
            cleanArr.push(resultBottom1.arr);
            selfItem1 = selfItem1 ? selfItem1 : item;
        }
        if (selfItem1) {
            cc.log(`可以被消除`);
            const retArr = [];
            cleanArr.forEach((arr) => {
                arr.forEach((im) => {
                    retArr.push(this._ItemArr[im.y][im.x].item);
                });
            });
            if (selfItem1) {
                retArr.push(selfItem1);
            }
            result.res = true;
            result.cleanArr = retArr;
            return result;
        } else {
            result.res = false;
            return result;
        }
    },
    /**
     *  检查在数组中，有没有对应位置的item，有，就不做处理，没有就将item放入数组中
     */
    checkIsSameItem(arr, item) {
        let same = false;
        arr.forEach((items) => {
            if (items.zuobiao.x == item.zuobiao.x && items.zuobiao.y == item.zuobiao.y) {
                same = true;
            }
        });
        if (same == false) {
            arr.push(item);
        }
    },

});
cc.gameControl = GameControl.getInstance();