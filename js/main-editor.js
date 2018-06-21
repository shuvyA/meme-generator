'use strict';


var gIdxLine = 0;

var canvas;

function initEditor() {
    editorRender();
    canvas = document.getElementById('img-canvas');
    renderImg();
}

function editorRender() {

    var strHtml = `
    

        <h1>editor-canvas</h1>


        <div class="container">

            <canvas id="img-canvas">
            </canvas>
            <div class="control-box">
                <input class="txt-user${gIdxLine}" type="text" oninput="renderTxt()" placeholder="give a text">

                <button type="submit" onclick="addTxtLine()">Add-Line</button>
                <button type="submit" onclick="fontSizeUp()">+</button>
                <button type="submit" onclick="fontSizeDown()">-</button>
                <input type="color" name="favcolor" value="#ff0000" onchange="colorChange(this.value,${gIdxLine})">
                
                
                <div class="add-line"></div>
                <a href="#" onclick="downloadImg(this)" download="my-img.jpg" >
                Download as jpeg
              </a>
            </div>
        </div>
    
    `;
{/* <button type="submit" onclick="renderReset(idxLine)">Reset</button> */}

    document.querySelector('.editor-canvas').innerHTML = strHtml;

}


function renderImg() {
    var currImgIdx = getImgfromSelctId();

    var imgUrl = gImgs[currImgIdx].url;

    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = imgUrl;

    ctx.drawImage(img, 0, 0, 300, 300);
}


function GetTxtFromUser(idxLine) {
    renderImg();
    // debugger;
    return document.querySelector(`.txt-user${idxLine}`).value;

}

// To do fix clean img 
function renderReset() {
    renderImg();
    document.querySelector(`.txt-user${gIdxLine}`).value;
}

function renderTxt(idxLine) {
    if (!idxLine) idxLine = 0;
    var txtFromUser = GetTxtFromUser(idxLine);
    gMeme.txts[idxLine].line = txtFromUser;

    for (var i = 0; i < gMeme.txts.length; i++) {
        // var cuuTxt = gMeme.txts[i];
        var txtCanvas = gMeme.txts[i].line;
        var y = 50 + ((i + 1) * 12);


        var fontSize = gMeme.txts[i].size;
        var color = gMeme.txts[i].color;



        var ctx = canvas.getContext("2d");
        ctx.font = fontSize + 'px sans-serif';
        // ctx.font = getFont();
        // ctx.font = "15px Comic Sans MS";


        ctx.textAlign = gMeme.txts[i].align // move right or left or center
        ctx.fillStyle = color;
        ctx.fillText(txtCanvas, 60, y);
    }
}




function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}



function addTxtLine() {
    gIdxLine++;
    console.log(gIdxLine);

    var cuurTxt = gMeme.txts;

    var lineHtml = '';

    var obj = {
        line: '',
        size: 40,
        align: 'left',
        color: 'red'
    }
//to do fn obj
    cuurTxt.push(obj);

    gMeme.txts[gIdxLine].size = '30';
    gMeme.txts[gIdxLine].color = 'blue';
    var prevTxt = '';

    // render inputs-->>
    for (var i = 1; i <= gIdxLine; i++) {

        lineHtml += `
        <input class="txt-user${i}" type="text" oninput="renderTxt(${i})"  value ="" placeholder="give a text">
        <button type="submit" onclick="fontSizeUp(${i})">+</button>
        <button type="submit" onclick="fontSizeDown(${i})">-</button>
        <button type="submit" onclick="alignText(${i}, 'right')"><i class="fas fa-align-left"></i></button> 
        <button type="submit" onclick="alignText(${i}, 'center')"><i class="fas fa-align-center"></i></button>
        <button type="submit" onclick="alignText(${i}, 'left')"><i class="fas fa-align-right"></i></button>
        `;
    }

    document.querySelector('.add-line').innerHTML = lineHtml;

    // prev value -->

    for (var i = 1; i <= gIdxLine; i++) {
        document.querySelector(`.txt-user${i - 1}`).value = gMeme.txts[i - 1].line;
    }
}



function fontSizeDown(idxLine) {
    console.log('down size');
    gMeme.txts[idxLine].size--;
}

function fontSizeUp(idxLine) {
    console.log('up size');
    gMeme.txts[idxLine].size++;

}

function colorChange(val,lineIdx){

    console.log(val);

}





































































function alignText(lineIdx, direction) {
    gMeme.txts[lineIdx].align = direction;
    renderTxt(lineIdx);
}




// function fontLeft(lineIdx) {

// }

// function fontSizeRight(lineIdx) {

// }
