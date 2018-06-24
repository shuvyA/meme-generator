'use strict';

var gMeme = {};

function createMeme(imgId) {
    return gMeme = {
        selectedImgId: imgId,
        txts: [
            {
                line: '',
                size: 20,
                align: 'center',
                color: 'black',
                font: 'sans-serif',
                x: 150,
                y: 50,
                shadowY: 0,
                shadowX: 0
            }
        ]
    };
}


function getUrl() {
    var imgIdx = null;
    gImgs.forEach(function (img, idx) {
        if (gMeme.selectedImgId === img.id) imgIdx = idx;
    });
    return gImgs[imgIdx].url;
}

function createCanvas(imgUrl) {

    var ctx = gCanvas.getContext("2d");
    var img = new Image();
    img.src = imgUrl;
    gCanvas.width = img.width;
    gCanvas.height = img.height;

    if (img.height > 350) {
        var ratio = gCanvas.height / 350;
        gCanvas.height = 350;
        gCanvas.width = gCanvas.width / ratio;
    }

    if (window.innerWidth < 500) console.log('katan');
    ctx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}






function addMeme() {
    var newY = gMeme.txts[gIdxLine - 1].y + 20;
    var newMeme = {
        line: '',
        size: 20,
        align: 'center',
        color: 'black',
        font: 'sans-serif',
        x: 150,
        y: newY,
        shadowY: 0,
        shadowX: 0
    }
    gMeme.txts.push(newMeme);
}

// function getTextIdx(x,y) {
//     var ctx = gCanvas.getContext("2d");
//     gMeme.txts.forEach(function(meme, idx){
//         currTextWidth = ctx.measureText(currText.line).width;
//         if (currText.align === 'center') {
//             var leftTextEdge = currText.x - currTextWidth / 2;
//             var rightTextEdge = currText.x + currTextWidth / 2;
//         } else if (currText.align === 'start') {
//             leftTextEdge = currText.x;
//             rightTextEdge = currText.x + currTextWidth;
//         } else {
//             rightTextEdge = currText.x;
//             leftTextEdge = currText.x - currTextWidth;
//         }

//         var bottomTextEdge = currText.y;
//         var topTextEdge = bottomTextEdge - currText.size;

//         if (x < rightTextEdge && x > leftTextEdge && y < bottomTextEdge && y > topTextEdge) {
//             var choosenText = idx;
//         }
//     });
//     return choosenText;
// }

