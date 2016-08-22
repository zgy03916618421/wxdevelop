/**
 * Created by Administrator on 2016/8/22.
 */
exports.set = function (key,value) {
    return new Promise(function (resolve,reject) {
        redis.set(key,value,function (err) {
            if (err) reject(err);
            else resolve();
        })
    })
}
exports.get = function (key) {
    return new Promise(function (resolve,reject) {
        redis.get(key,function (err,result) {
            if(err) reject(err);
            else resolve(result);
        })
    })
}
exports.expire = function (key,time) {
    return new Promise(function (resolve,reject) {
        redis.expire(key,time,function (err) {
            if (err) reject(err);
            else resolve();
        })
    })
}