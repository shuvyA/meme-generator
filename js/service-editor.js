'use strict';

var gMeme ={};

function createMeme(imgId) {
    return gMeme = {
        selectedImgId: imgId,
    txts: [
        {
            line: '',
            size: 30,
            align: 'center',
            color: 'black',
            font:'impact',
            x:150,
            y:50,
            shadow:true
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
    gCanvas.width = 300;
    gCanvas.height = 300;
    var ctx = gCanvas.getContext("2d");
    var img = new Image();
    img.src = imgUrl;
    ctx.drawImage(img, 0, 0, 300, 300);
}

// function addMeme() {
//     var lastMeme = gMeme.txts.length - 1;
//     lastMeme = lastMeme + lastMeme%2;
//         console.log(lastMeme);
        
    
//     var newY = gMeme.txts[lastMeme].y + 30;
//     var newMeme = {
//             line: '',
//             size: 30,
//             align: 'center',
//             color: 'black',
//             font:'impact',
//             x:150,
//             y:newY,
//             shadow:true
//         }
//         gMeme.txts.push(newMeme);
// }

function getTextIdx(x,y) {
    var chosenText = null;
    var ctx = gCanvas.getContext("2d");
    gMeme.txts.forEach(function(currText, idx){
        var currTextWidth = ctx.measureText(currText.line).width;
        if (currText.align === 'center') {
            var leftTextEdge = currText.x - currTextWidth / 2;
            var rightTextEdge = currText.x + currTextWidth / 2;
        } else if (currText.align === 'start') {
            leftTextEdge = currText.x;
            rightTextEdge = currText.x + currTextWidth;
        } else {
            rightTextEdge = currText.x;
            leftTextEdge = currText.x - currTextWidth;
        }

        var bottomTextEdge = currText.y;
        var topTextEdge = bottomTextEdge - currText.size;
        
        if (x < rightTextEdge && x > leftTextEdge && y < bottomTextEdge && y > topTextEdge) {
            chosenText = idx;
        }
    });
    return chosenText;
}

