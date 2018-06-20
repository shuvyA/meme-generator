'use strict';


var idxLine = 0;

var canvas = document.getElementById('img-canvas');

function initEditor() {


    // debugger;
    renderImg();

    // renderTxt();

    console.log('manadfdfasfd');

}


function renderImg() {



    // gMeme.txts[0].url = "/img/2.jpg";

    var currImgIdx = getImgfromSelctId();

    var imgUrl = gImgs[currImgIdx].url;

    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 250, 250);
    }
    img.src = imgUrl;
}


function GetTxtFromUser() {
    return document.querySelector('.txt-user').value;
}


function renderReset() {
    renderImg();
    document.querySelector('.txt-user').value = '';

}

function renderTxt(idxLine) {

    var txtFromUser = gMeme.txts[0].line;
    var fontSize = gMeme.txts[0].size;
    var color = gMeme.txts[0].color;

    txtFromUser = GetTxtFromUser();

    // console.log(txtFromUser);

    var ctx = canvas.getContext("2d");
    // ctx.clearRect(10, 50, 0, 0);

    ctx.font = "30px Arial";
    ctx.fillStyle = color;
    ctx.fillText(txtFromUser, 10, 50);
}



// function downloadImg(){


// }


function getImgfromSelctId() {

    var res = '';
    var id = gMeme.selectedImgId;
    // gImgs[0].id

    gImgs.forEach(function (item, idx) {
        if (id ===  gImgs[idx].id) res = idx;
    });

    return res;
}







