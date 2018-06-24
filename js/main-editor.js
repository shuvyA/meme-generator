'use strict';

var gChosenText = 0;

var gCanvas;

function initEditor() {
    editorRender();
    gCanvas = document.querySelector('#img-canvas');
    renderImg();
}

function editorRender() {

    var strHtml = `
    

        <h1>editor-canvas</h1>


        <div class="editor flex space-between flex-wrap">

            <canvas id="img-canvas" onclick = 'getPosition(event)'>
            </canvas>
            <div class="control-box">
                <input class="txt-user" type="text" oninput="renderTxt()" placeholder="write your meme">

                <button type="submit" onclick="addTxtLine()">Add-Line</button>
                <button type="submit" onclick="changeFontSize('increase')">+</button>
                <button type="submit" onclick="changeFontSize('decrease')">-</button>
                <button type="submit" onclick="alignText('end')"><i class="fas fa-align-left"></i></button> 
                <button type="submit" onclick="alignText('center')"><i class="fas fa-align-center"></i></button>
                <button type="submit" onclick="alignText('start')"><i class="fas fa-align-right"></i></button>
                <button type="submit" onclick="moveText('right')"><i class="fas fa-angle-double-left"></i></button>
                <button type="submit" onclick="moveText('left')"><i class="fas fa-angle-double-right"></i></button>
                <button type="submit" onclick="moveText('down')"><i class="fas fa-angle-double-down"></i></button>
                <button type="submit" onclick="moveText('up')"><i class="fas fa-angle-double-up"></i></button>
                <button type="submit" onclick="alignText('top')">&#8793</button>
                <button type="submit" onclick="alignText('bottom')">&#8794</button>
                <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-font"></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a class="dropdown-item" href="#" onclick = changeFont('eurof')>eurof</a>
                        <a class="dropdown-item" href="#" onclick = changeFont('lato')>lato</a>
                        <a class="dropdown-item" href="#" onclick = changeFont('Impact')>Impact</a>
                        <a class="dropdown-item" href="#" onclick = changeFont('Indie_Flower')>Indie_Flower</a>
                        <a class="dropdown-item" href="#" onclick = changeFont('Quicksand')>Quicksand</a>
                        <a class="dropdown-item" href="#" onclick = changeFont('Oswald')>Oswald</a>
                        <a class="dropdown-item" href="#" onclick = changeFont('san-serif')>san-serif</a>
                    </div>
                </div>
                <button type="submit" onclick="sddShadow()">shadow</button>
                <input type="color" name="favcolor" value="#ff0000" onchange="colorChange(this.value)">
                
                <button type="submit" onclick="renderReset(idxLine)">Reset</button>  
                
                <div class="add-line"></div>
                <a href="#" onclick="downloadImg(this)" download="my-img.jpg" >
                Download as jpeg
              </a>
            </div>
        </div>
    
    `;

    document.querySelector('.editor-canvas').innerHTML = strHtml;

}


function renderImg() {
    var imgUrl = getUrl()
    createCanvas(imgUrl);
}


function GetTxtFromUser() {
    renderImg();
    return document.querySelector(`.txt-user`).value;
    
}

function renderReset() {
    renderImg();
    gMeme.txts = [];
    renderTxt();
}

function renderTxt() {
    var txtFromUser = GetTxtFromUser();
    gMeme.txts[gChosenText].line = txtFromUser;
    
    for (var i = 0; i < gMeme.txts.length; i++) {
        var currText = gMeme.txts[i];
        var txtCanvas = currText.line;
        var y = currText.y;
        var x = currText.x;
        var fontSize =currText.size;
        var color = currText.color;
        var ctx = gCanvas.getContext("2d");
        var fontFamily = currText.font;
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = currText.align;
        if (!currText.shadow) {
            ctx.shadowOffsetY=0;
            ctx.shadowOffsetX=0;
        }
        ctx.shadowOffsetY=3;
        ctx.shadowOffsetX=3;
        ctx.shadowColor="grey";
        ctx.fillText(txtCanvas, x, y);
    }
}


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}


function addTxtLine() {
    gChosenText++;
    addMeme();
    document.querySelector('.txt-user').value ='';
}


function changeFontSize(direction) {
    var currText = gMeme.txts[gChosenText];
    direction === 'increase'? currText.size++ : currText.size--;
    renderTxt();
}

function alignText(direction) {
    var currText = gMeme.txts[gChosenText];
    if (direction === 'start' || direction === 'end' || direction === 'center') {
        currText.align = direction;
        currText.x = 150;
    } else {
        currText.y = (direction === 'bottom')? 250 : 50;
    }
    renderTxt();
}

function moveText(direction) {
    var currText = gMeme.txts[gChosenText];
    if (direction === 'right' || direction === 'left'){
        currText.x = (direction === 'right')? currText.x - 5 : currText.x + 5;
    } else {
        currText.y = (direction === 'down')? currText.y + 5 : currText.y - 5;
    }
    renderTxt();
}

function changeFont(font) {
    gMeme.txts[gChosenText].font = font;
    renderTxt();    
}

function sddShadow() {
    if (gMeme.txts[gChosenText].shadow) {
        gMeme.txts[gChosenText].shadow = false;
    }else {
        gMeme.txts[gChosenText].shadow = true;
    }
    renderTxt();
}

function getPosition(click) {
    var rect = gCanvas.getBoundingClientRect();
    var x = click.clientX - rect.left;
    var y = click.clientY - rect.top;
    gChosenText = getTextIdx(x,y);    
    document.querySelector('.txt-user').value = gMeme.txts[gChosenText].line;
}

function colorChange(val) {
    gMeme.txts[gChosenText].color= val;
    renderTxt();
}











function deleteLine(lineIdx){

console.log('del',lineIdx);
// delete item of array
gMeme.txts.splice(1,lineIdx);
renderTxt();


}

















































