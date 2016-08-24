/**
 * Created by Administrator on 2016/8/22.
 */
var Canvas = require('canvas');
var path = require('path');
var http = require('http');
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
exports.imgMake = function (data,username,openid) {
        var Image = Canvas.Image;
        var maskImg = new Image();
        var hlTitleImg = new Image();
        maskImg.src = fs.readFileSync(path.join(__dirname, 'img', 'make_bg.png'));
            var w = 720;
            var h = 840;
            var canvas = new Canvas(w,h);
            var context = canvas.getContext('2d');
            context.drawImage(maskImg,0,0);
            console.log('here1')
            var tag = data[3];
            console.log("tag:"+tag);
            var tagErect = data[3][3].pop();
            for (i = 0; i < tag.length; i++) {
                for (k = 0; k < tag[i].length; k++) {
                    posObj[i][k].text = tag[i][k];
                }
            }
            setText(context, posObj);
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
            //var stream = canvas.createPNGStream();
            //var out = fs.createWriteStream( 'img/'+openid+'.png');
            //stream.pipe(out);
            /*http.get(url, function (res) {
                var buf = '';
                res.setEncoding('binary');
                res.on('data', function(chunk){ buf += chunk; });
                console.log(buf);
                res.on('end', function(){
                    console.log('here 2');
                    hlTitleImg.onload = function(){
                        console.log('here 3')
                        context.drawImage(hlTitleImg,100,318);
                        //var out = fs.createWriteStream(path.join(__dirname, 'test2.jpg'))
                        var stream = canvas.createJPEGStream();
                        console.log(stream);
                        //stream.pipe(out)
                        resolve(stream);

                    };
                    hlTitleImg.onerror = function(err){
                        reject(err);
                    };
                    hlTitleImg.src = new Buffer(buf, 'binary');
                });
            });*/
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
























