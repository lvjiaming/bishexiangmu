/**
 *  玩家自己信息的管理器
 * @type {Function}
 */
const User = cc.Class({
    statics: {
        getInstance() {
            if (!this.user) {
                this.user = new User();
            }
            return this.user;
        },
    },
    _nickName: null, // 昵称，下划线开头的变量都为私有变量
    _score: null, // 分数
    ctor() {
        this._nickName = null;
        this._score = null;
    },
    /**
     *  设置昵称
     * @param nickname
     */
    setNickName(nickname) {
        this._nickName = nickname;
    },
    /**
     *  得到昵称
     * @returns {null}
     */
    getNickName() {
        return this._nickName;
    },
    /**
     *  设置分数
     * @param score
     */
    setScore(score) {
        this._score = score;
    },
    /**
     *  得到分数
     * @returns {null}
     */
    getScore() {
        return this._score;
    },
});

cc.user = User.getInstance();