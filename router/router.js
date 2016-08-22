/**
 * Created by Administrator on 2016/8/7.
 */
var express=require('express');
var router=express.Router();
var C=require('../controller/controller');
router.get('/',C.wxcheckSignature);
router.post('/',C.imgSend);
module.exports=router;