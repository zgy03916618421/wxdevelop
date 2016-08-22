/**
 * Created by Administrator on 2016/8/7.
 */
var express=require('express');
var bodyParser=require('body-parser');
var router=require('./router/router');
require('./connectRedis');
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);
app.listen(10000);