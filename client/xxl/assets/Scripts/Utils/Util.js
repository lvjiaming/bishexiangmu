/**
 *  各种工具模块
 * @type {{}}
 */
const Util = {};
/**
 *  将对象转换为数组
 * @param obj
 */
Util.objectToArray = (obj) => {
    const arr = [];
    for (let item in obj) {
        arr.push(obj[item]);
    }
    return arr;
};
/**
 *  获取一个取件的随机整数
 * @param start 最小值
 * @param end 最大值
 * @returns {number}
 */
Util.randomInter = (start, end) => {
    return Math.floor(Math.random() * (end - start +1) + start);
};

cc.util = Util;