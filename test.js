/**
 * Created by Administrator on 2016/8/7.
 *
 */
var request = require('superagent');
var co = require('co');
var fs = require('fs');
var req = require('request');
var path = require('path');
var httpUtils = require('./HttpUtils');
function get(url,err) {
    return new Promise(function (resolve,reject) {
        request.get(url).end(function (err,res) {
            if(err) reject(err);
            else resolve(res);
        })
    })
}
function read(path,err) {
    return new Promise(function (resolve,reject) {
        fs.readFile(path,function (err,data) {
            if(err) reject(err);
            else resolve(data);
        })
    })
}
function post(url,data,err) {
    return new Promise(function (resolve,reject) {
        request.post(url).type(form).send({meida:data}).end(function (err,res) {
            if (err) reject(err);
            else resolve(res);
        })
    })
}
function post1(opts) {
    return new Promise(function (resolve,reject) {
        req(opts,function (err,res,body) {
            if (err) reject(err);
            else resolve(body);
        })
    })
}
co(function *() {
   // var res = yield get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9a66afce31e4ec8b&secret=c2b679dbd1ea6c0ffc99155123a25697');
    //res = JSON.parse(res.text);
    //var token = res.access_token;
    //console.log(token);
    //var res = yield httpUtils.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9a66afce31e4ec8b&secret=c2b679dbd1ea6c0ffc99155123a25697');
   // res = JSON.parse(res.text);
    //var token = res.access_token;
    //console.log(token);
    //var token = '5Ol1CLwnWeAZ2IkfjkqNBgIFYXmvHuKVgfTSWD6j8fbNQcFRCmZlQvY8mPw0vwSpI-aQHOBxhB2KLscoYoRcdLnX_6ASjE5ZHehHc7l4iyj_H6ybqqlUZEq8t8A1Dh05AIChAHAQYS';
    var opts ={
        method: 'POST',
        url: 'https://api.weixin.qq.com/cgi-bin/media/upload',
        qs:
        { access_token: 'nUMQiB8s2NlxeMUNTfIjZLQdj7lWLmNG0HUVTSScBLNp-sx1mehYjf9cHnl6amWzIMY-gRVBv7poeqLH-F6f8CSJ2jB0UP3RxGiaRxGBkhmj5qDHeQPpPNIpdVRchEmJGEZgABATRM',
            type: 'image' },
        headers:
        {
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
        formData:
        { media:
        { value: fs.createReadStream(__dirname + '/temp.png'),
            options : {filename : 'temp.jpg',contentType : 'image/png'}
        } }
    }
    var body = yield post1(opts);
    console.log(body);
    //var rs = yield reqst(url,opts);
    //console.log(rs);
    //var rs = yield post(url,opts);
    //console.log(rs);
    //console.log(res.text);
})
