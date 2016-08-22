/**
 * Created by Administrator on 2016/8/22.
 */
//var request = require('superagent');
var req = require('request');
/*exports.get = function (url,err) {
    return new Promise(function (resolve,reject) {
        request.get(url).end(function (err,res) {
            if(err) reject(err);
            else resolve(res);
        })
    })
}*/
exports.get = function (opts) {
    return new Promise(function (resolve,reject) {
        req(opts,function (err,res,body) {
            if (err) reject(err);
            else resolve(body);
        })
    })
}
exports.post = function (opts) {
    return new Promise(function (resolve,reject) {
        req(opts,function (err,res,body) {
            if (err) reject(err);
            else resolve(body);
        })
    })
}