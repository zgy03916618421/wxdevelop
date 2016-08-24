/**
 * Created by Administrator on 2016/8/24.
 */
var fs = require('fs')
var path = require('path')
var Canvas = require('canvas');
var canvas = new Canvas(320, 320)
var ctx = canvas.getContext('2d')
ctx.fillText('真操蛋', 0, 70)
canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'font.png')))