/**
 * Created by Administrator on 2016/8/7.
 */
var crypto=require('crypto');
var temp=['dafd','bewe','aeffa'];
temp.sort();
a=temp.join('');
var sh1=crypto.createHash('sha1');
sh1.update(a);
str=sh1.digest('hex');
console.log(str)
console.log(temp);