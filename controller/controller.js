/**
 * Created by Administrator on 2016/8/7.
 */
var bodyParser=require('body-parser');
var cryPto=require('crypto');
var xml2js=require('xml2js');
var co = require('co');
var request = require('request');
var redisTemplate = require('../redisTemplate');
var httpUtils = require('../HttpUtils');
//var express=require('express');
//var app=express();
//app.use(bodyParser.urlencoded({extended:false}));
/*exports.wxcheckSignature=function (req,res) {
    var signature=req.body.signature;
    var timestamp=req.body.timestamp;
    var nonce=req.body.nonce;
    var token='zgy';
    console.log(timestamp,token);
}*/
function wxcheckSignature(req,res) {
    var signature=req.query.signature;
    var timestamp=req.query.timestamp;
    var nonce=req.query.nonce;
    var echostr=req.query.echostr;
    var token='zgy';
    var tempArr=[token,timestamp,nonce];
    tempArr.sort();
    var tempStr=tempArr.join('');
    var sha1=cryPto.createHash('sha1');
    sha1.update(tempStr,'utf8');
    tempStr=sha1.digest('hex');
    if(tempStr==signature){
        console.log('success');
    }else {
        console.log('failed');
    }
    res.send(echostr);
}
function imgSend(req,res) {
    co(function *() {
        var token = yield redisTemplate.get('access_token');
        if (token == null){
            var res = yield httpUtils.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9a66afce31e4ec8b&secret=c2b679dbd1ea6c0ffc99155123a25697');
            res = JSON.parse(res.text);
            token = res.access_token;
            console.log(token);
            yield redisTemplate.set('access_token',token);
        }
        req.on('data',function (chunk) {
            xml2js.parseString(chunk,{explicitArray : false},function (err,json) {
                console.log(json);
                user_openid = json.FromUserName;
                content = json.Content;

            })
        });
        res.end('success');
    }
    )

}
exports.imgSend=imgSend;
exports.wxcheckSignature=wxcheckSignature;
