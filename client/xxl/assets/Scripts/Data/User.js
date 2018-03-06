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
    ctor() {
        this._nickName = null;
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
});

cc.user = User.getInstance();