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
var makeImg = require('../tagGenerate');
var fs = require('fs');
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
        console.log('join in');
        var token = yield redisTemplate.get('access_token_wechat');
        console.log(token);
        if (token == null){
            var opts = { method: 'GET',
                url: 'https://api.weixin.qq.com/cgi-bin/token',
                qs:
                { grant_type: 'client_credential',
                    appid: 'wx9a66afce31e4ec8b',
                    secret: 'c2b679dbd1ea6c0ffc99155123a25697' },
                };
            var result = yield httpUtils.get(opts);
            result = JSON.parse(result);
            console.log(result);
            token = result.access_token;
            yield redisTemplate.set('access_token_wechat',token);
            yield redisTemplate.expire("access_token_wechat",7200);
        }
        console.log(token);
        var xml = yield accquireXML(req);
        console.log(xml);
        var xmljs = yield xml2json(xml);
        console.log(xmljs);
       // var openid = xmljs.xml.FromUserName;
        var content = xmljs.xml.Content;
        console.log(content);
        //console.log(openid);
        //var url = 'https://api.weixin.qq.com/cgi-bin/user/info';
        //var opts = {
        //    method : 'GET',
        //    url : url,
         //   qs:
         //   {
         //       access_token :token,
         //       openid : openid
         //   }
      //  };
        //var userinfo = yield httpUtils.get(opts);
        //console.log(userinfo);
        //userinfo=JSON.parse(userinfo);
        //var username = userinfo.nickname;
        var username = 'zhougy';
        console.log(username);
        var url = encodeURI('https://dev-goat.beautifulreading.com/goat/bookdetail/'+content+'/57a7fecce779893b48000002');
        console.log(url);
        var opts = {
            method : 'GET',
            url : url
        }
        var strData = yield httpUtils.get(opts);
        console.log(strData);
        var rdata = JSON.parse(strData);
        var data = rdata.data;
        console.log(data);
        var stream=yield makeImg.imgMake(data,username);
        fs.writeFileSync('test.jpg',stream);
        console.log(stream);
        res.end('success');
    }
    )
}
function xml2json(xml) {
    return new Promise(function (resolve,reject) {
        xml2js.parseString(xml,{explicitArray : false},function (err,json) {
            if(err) reject(err);
            else resolve(json);
        })
    })
}
function accquireXML(req,err) {
    return new Promise(function (resolve,reject) {
        req.on('data',function (chunk) {
            resolve(chunk);
        })
    })
}
exports.imgSend=imgSend;
exports.wxcheckSignature=wxcheckSignature;
