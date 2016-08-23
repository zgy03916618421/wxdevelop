/**
 * Created by Administrator on 2016/8/23.
 */
var Canvas = require('canvas');
var path = require('path');
var fs = require('fs');
var posObj = [
    [
        {
            x: 156.5,
            y: 53,
            fontSize: 11,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 156,
            y: 67,
            fontSize: 11,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 180.5,
            y: 50,
            fontSize: 26,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 234,
            y: 53,
            fontSize: 11,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 234,
            y: 67,
            fontSize: 11,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 258,
            y: 49.5,
            fontSize: 26,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 225,
            y: 103,
            fontSize: 12,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 253.5,
            y: 82.5,
            fontSize: 28,
            color: 'rgb(197, 159, 136)',
            fontWeight: 'bold'
        },
        {
            x: 210,
            y: 116,
            fontSize: 32,
            color: 'rgb(197, 159, 136)',
            fontWeight: 'bold'
        },
        {
            x: 276,
            y: 122,
            fontSize: 16,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 220.5,
            y: 210,
            fontSize: 32,
            color: 'rgb(197, 159, 136)',
            fontWeight: 'bold'
        },
        {
            x: 52.5,
            y: 237,
            fontSize: 28,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 182,
            y: 229,
            fontSize: 16,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 200.5,
            y: 277,
            fontSize: 18,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 256,
            y: 295,
            fontSize: 14,
            color: 'rgb(197, 159, 136)'
        }
    ],
    [
        {
            x: 214,
            y: 87,
            fontSize: 12,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 277.5,
            y: 142,
            fontSize: 10,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 130,
            y: 212.5,
            fontSize: 15,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 180.5,
            y: 213,
            fontSize: 11,
            color: 'rgb(197, 159, 136)'
        },
        {
            x: 241.5,
            y: 275,
            fontSize: 14,
            color: 'rgb(197, 159, 136)'
        }
    ],
    [
        {
            x: 49.5,
            y: 50.5,
            fontSize: 26,
            color: 'rgb(197, 159, 136)',
            text: '爱憎分明'
        },
        {
            x: 51.5,
            y: 212.5,
            fontSize: 18,
            color: 'rgb(197, 159, 136)',
            text: '多愁善感',
            fontWeight: 'bold'
        },
        {
            x: 125.5,
            y: 232.5,
            fontSize: 12,
            color: 'rgb(197, 159, 136)',
            text: '爱憎分明'
        },
        {
            x: 220,
            y: 249,
            fontSize: 16,
            color: 'rgb(197, 159, 136)',
            text: '处事小心'
        },
        {
            x: 51.5,
            y: 271,
            fontSize: 36,
            color: 'rgb(197, 159, 136)',
            text: '善于分析',
            fontWeight: 'bold'
        },
    ],
    [
        {
            x: 50,
            y: 83,
            fontSize: 32,
            color: 'rgb(197, 159, 136)',
            fontWeight: 'bold'
        },
        {
            x: 200,
            y: 300,
            fontSize: 10,
            color: 'rgb(197, 159, 136)'
        },
    ],
    [
        {
            x: 115.5,
            y: 250,
            fontSize: 16,
            color: 'rgb(197, 159, 136)'
        }
    ]
]
var Img = Canvas.Image;
var maskImg = new Image();
var hlTitleImg = new Image();
var canvas = new Canvas(720,840);
var context = canvas.getContext('2d');
maskImg.src = fs.readFileSync(path.join(__dirname,'image','make_bg.png'));
context.drawImage(maskImg,0,0);