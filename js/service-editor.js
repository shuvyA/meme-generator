'use strict';

var gMeme = {};

function createMeme() {
        var text = {
            line: '',
            size: 30,
            align: 'center',
            color: 'black',
            font: 'impact',
            x: gCanvas.width / 2,
            y: checkHeight(),
            shadow: true,
            chosen:false
}
    gMeme.txts.push(text)
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
        
    if (img.width > 470) {
        var ratio = gCanvas.width / 470;
        gCanvas.width = 470;
        gCanvas.height = gCanvas.height / ratio;
    }

    if (document.body.offsetWidth < 570) {
        gCanvas.width = document.body.offsetWidth - 40;
        gCanvas.height = gCanvas.width * (img.height / img.width);
    }
    ctx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function addMeme() {
    // if (!gMeme.txts) firstMeme(); return;
    if (gMeme.txts.length === 1) secondMeme(); return;
    var lastMeme = gMeme.txts.length - 1;
    lastMeme = lastMeme + lastMeme % 1;
    var newY = gMeme.txts[lastMeme].y + 30;
    var newMeme = {
        line: '',
        size: 30,
        align: 'center',
        color: 'black',
        font: 'impact',
        x: 150,
        y: newY,
        shadow: true,
        chosen:false
    }
    gMeme.txts.push(newMeme);
}

function getTextIdx(x, y) {
    var chosenText = null;
    var ctx = gCanvas.getContext("2d");
    gMeme.txts.forEach(function (currText, idx) {
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
            if (currText.chosen === true) {
                currText.chosen = false;
                renderTxt();
                gChosenText = 0;
            } else {
                removePrevChosen();
                currText.chosen = true;
                markLine(leftTextEdge, topTextEdge, currTextWidth,  currText.size);
            }
            chosenText = idx;
        }
    });
    return chosenText;
}

function removePrevChosen() {
    gMeme.txts.forEach(function(meme, idx){
        if (meme.chosen) meme.chosen = false;
        renderTxt();
    })
}

function firstMeme() {
    gMeme.txts = [];
    var height = gCanvas.height * 0.1;
    gMeme.txts.push(getText(height))
}

function secondMeme() {
    var height = gCanvas.height * 0.9;
    gMeme.txts.push(getText(height))
    
}

function checkHeight() {
    if (gMeme.txts.length === 0) return gCanvas.height * 0.1; 
    if (gMeme.txts.length === 1) return gCanvas.height * 0.9;
    if (gMeme.txts.length === 2) return gMeme.txts[0].y + 30;
    var lastMeme = gMeme.txts.length - 1;
    lastMeme += lastMeme % 1;
    return gMeme.txts[lastMeme].y + 30;
}