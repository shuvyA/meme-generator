'use strict';



var canvas = document.getElementById('img-canvas');

function initEditor() {

    renderImg();
    // GetTxtFromUser();

    renderTxt();

    console.log('manadfdfasfd');

}


function renderImg() {
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 250, 250);
    }
    img.src = "/img/2.jpg";
}



function GetTxtFromUser() {


}



function renderTxt() {

    var txtFromUser = gMeme.txts[0].line;
    var fontSize = gMeme.txts[0].size;
    var color = gMeme.txts[0].color;

    txtFromUser = document.querySelector('.txt-user').value;

    // console.log(txtFromUser);
    var ctx = canvas.getContext("2d");
    // ctx.clearRect(10, 50, 0, 0);

    ctx.font = "30px Arial";
    ctx.fillStyle = color;
    ctx.fillText(txtFromUser, 10, 50);

    // ctx.fillText(gMeme.txts[0].line, 10, 50);
}



// function downloadImg(){


// }








