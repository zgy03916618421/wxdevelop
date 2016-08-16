/**
 * Created by Administrator on 2016/8/7.
 */
var bodyParser=require('body-parser');
var cryPto=require('crypto');
var xml2js=require('xml2js');
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
    req.on('data',function (chunk) {
        xml2js.parseString(chunk,{explicitArray : false},function (err,json) {
            console.log(json);
        })
    });
    var data='<xml><ToUserName>oZMiAszH0O7osIIwheJMPjcnuKPE</ToUserName><FromUserName>zgy03916618421</FromUserName><CreateTime>123432</CreateTime><MsgType>image</MsgType><Image><MedialId>NB6kKmkNFwBGUXwI9ueCybqBJSKNgKhxURJsOnhRV10D9YgPgTpkBNLA8JYgB31C</MedialId></Image></xml>>'
    res.writeHead(200,{'Content-Type':'application/xml'});
    res.end(data);

}
exports.imgSend=imgSend;
exports.wxcheckSignature=wxcheckSignature;