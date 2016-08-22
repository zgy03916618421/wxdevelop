/**
 * Created by Administrator on 2016/8/22.
 */
var redis = require('redis');
var client = redis.createClient(6379,'192.168.100.2',function () {
    
})
client.on('connect',function () {
    global.redis =client;
    console.log('success connect redis!!!');
})