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
//var makeImg = require('../tagGenerate');
var Canvas = require('canvas');
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
        var token = yield redisTemplate.get('access_token_wechat');
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
            token = result.access_token;
            yield redisTemplate.set('access_token_wechat',token);
            yield redisTemplate.expire("access_token_wechat",7200);
        }
        var xml = yield accquireXML(req);
        var xmljs = yield xml2json(xml);
        var openid = xmljs.xml.FromUserName;
        var content = xmljs.xml.Content;
        console.log(openid);
        var url = 'https://api.weixin.qq.com/cgi-bin/user/info';
        var opts = {
            method : 'GET',
            url : url,
            qs:
            {
                access_token :token,
                openid : openid
            }
        };
        var userinfo = yield httpUtils.get(opts);
        console.log(userinfo);
        userinfo=JSON.parse(userinfo);
        var username = userinfo.nickname;
        console.log(username);
        var url = encodeURI('https://dev-goat.beautifulreading.com/goat/bookdetail/'+content+'/57a7fecce779893b48000002');
        var opts = {
            method : 'GET',
            url : url
        }
        var strData = yield httpUtils.get(opts);
        var rdata = JSON.parse(strData);
        var data = rdata.data;
        //console.log(data);
        console.log(data[2]);
        opts ={
            method : 'GET',
            url : data[2],
            encoding :'binary'
        }
        var file = yield httpUtils.get(opts);
        fs.writeFileSync('img/'+openid+'temp.png',file,'binary');
         //makeImg.imgMake(data,username,openid);
            var Image = Canvas.Image;
            var maskImg = new Image();
            var hlTitleImg = new Image();
            var w = 720;
            var h = 840;
            var canvas = new Canvas(w,h);
            var context = canvas.getContext('2d');
            maskImg.src = fs.readFileSync(path.join(__dirname, 'img', 'make_bg.png'));
            context.drawImage(maskImg,0,0);
            console.log('here1')
            var tag = data[3];
            console.log("tag:"+tag);
            var tagErect = data[3][3].pop();
            console.log(tagErect);
            for (i = 0; i < tag.length; i++) {
                for (k = 0; k < tag[i].length; k++) {
                    posObj[i][k].text = tag[i][k];
                    console.log(posObj[i][k]);
                }
            }
            setText(context, posObj);
            console.log('settext1');
            setText(context, [
                [
                    {
                        x: 68,
                        y: 130,
                        fontSize: 18,
                        color: 'rgb(64, 47, 42)',
                        text: '我是'+username,
                        fontWeight: 'bold',
                        width: 270
                    }
                ]
            ])
            console.log('settext2')
            drawTextErect(context, {
                x: 288.5,
                y: 212,
                fontSize: 18,
                color: 'rgb(197, 159, 136)',
                text: tagErect
            })
            console.log('here am I');
            hlTitleImg.src = fs.readFileSync('img/'+openid+'temp.png');
            console.log('may wrong here');
            context.drawImage(hlTitleImg,100,318);
            console.log('hers?');
            var buff = canvas.toBuffer();
            fs.writeFileSync('img/'+openid+'.png',buff);
        opts ={
                method: 'POST',
                url: 'https://api.weixin.qq.com/cgi-bin/media/upload',
                qs:
                { access_token: token,
                    type: 'image' },
                headers:
                {
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
                formData:
                { media:
                { value: fs.readFileSync( 'img/'+openid+'temp.png'),
                    options : {filename : openid + 'temp.png',contentType : 'image/png'}
                } }
            }
        var upresult = yield httpUtils.post(opts);
        console.log(upresult);
        var upjson = JSON.parse(upresult);
        var media_id = upjson.media_id;
        console.log(media_id);
        opts ={
            method : 'POST',
            url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send',
            qs: { access_token: token },
            headers:{
                'content-type': 'application/json'
            },
            body:
            { touser: openid,
                msgtype: 'image',
                image: { media_id: media_id } },
            json: true
        }
        var messageresult = yield httpUtils.post(opts);
        console.log(messageresult);
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
function setText(context, list){
    var i, k, listLen = list.length, arrLen;
    for (i = 0; i < listLen; i++){
        arrLen = list[i].length;
        for (k = 0; k < arrLen; k++) {
            if (list[i][k].fontWeight) {
                context.font = list[i][k].fontWeight + ' ' + (list[i][k].fontSize * 2) + 'px PingFangSC-Regular';
            } else {
                context.font = (list[i][k].fontSize * 2) + 'px PingFangSC-Regular';
            }

            context.fillStyle = list[i][k].color;
            if (list[i][k].width) {
                context.fillText(list[i][k].text, list[i][k].x * 2, (list[i][k].y * 2) + (list[i][k].fontSize * 2), list[i][k].width);
            } else {
                context.fillText(list[i][k].text, list[i][k].x * 2, (list[i][k].y * 2) + (list[i][k].fontSize * 2));
            }

        }
    }

}
function drawTextErect(context, txtObj){
    var i = 0,
        x,
        y,
        len = txtObj.text.length;
    var arrText = [];
    x = txtObj.x * 2;
    for (i; i < len; i++) {
        if (txtObj.fontWeight) {
            context.font =  txtObj.fontWeight + ' ' + (txtObj.fontSize * 2) + 'px PingFangSC-Regular';
        } else {
            context.font = (txtObj.fontSize * 2) + 'px PingFangSC-Regular';
        }

        context.fillStyle = txtObj.color;
        context.fillText(txtObj.text[i], x, ((txtObj.y * 2) + (txtObj.fontSize * 2)) + (((2 + txtObj.fontSize) * 2) * i));
    }
}
exports.imgSend=imgSend;
exports.wxcheckSignature=wxcheckSignature;
