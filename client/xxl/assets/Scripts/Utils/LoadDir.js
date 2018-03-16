
const LoadDir = {};
const DirRes = {};

/**
 *  加载一个文件夹里的资源，将文件里资源名字的大写作为key值保存在DirRes中
 * @param url 路径
 * @param cb 加载成功的回调
 */
LoadDir.loadDirRes = (url, cb) => {
    cc.loader.loadResDir(url, (err, dir) => {
        if (err) {
            cc.error(`error: ${err}`);
            return;
        }
        dir.forEach((item) => {
            if (item instanceof cc.SpriteFrame) {
                DirRes[item.name.toUpperCase()] = item;
            } else if (item instanceof cc.Prefab) {
                DirRes[item.name.toUpperCase()] = item;
            }
        });
        if (cb) {
            cb();
        }
    });
};

cc.loadDir = LoadDir;
cc.dirRes = DirRes;