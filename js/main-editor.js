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
    <div>
    <button class="btn-control" type="submit" onclick="openGallery()"><i class="far fa-times-circle"></i> Back to Gallery</button>
   
   </div>
    <div class="editor flex space-between flex-wrap" id="edit">
    <div class="cont-canvas">
            <h2><i class="fas fa-edit"></i> Editor</h2>
            <canvas id="img-canvas" onclick = 'getPosition(event)'>
            </canvas>
    </div>
    
    <div class="control-box">
    <a href="#"  onclick="downloadImg(this)" download="my-img.jpg" ><h2><i class="fas fa-download"></i>
    Download as image
  </h2></a>
  

            <div class="line-control">
            <input class="txt-user" type="text" oninput="renderTxt()" placeholder="write your meme">
            
            </div>
            <div class="line-control">
            <button class="btn-control" type="submit" onclick="addTxtLine()">Add-Line</button>
            <button class="btn-control" type="submit" onclick="changeFontSize('increase')"><i class="fas fa-search-plus"></i></button>
            <button class="btn-control" type="submit" onclick="changeFontSize('decrease')"><i class="fas fa-search-minus"></i></button>
            
            </div>
            <div class="line-control">
            <button class="btn-control" type="submit" onclick="alignText('start')"><i class="fas fa-align-left"></i></button> 
            <button class="btn-control" type="submit" onclick="alignText('center')"><i class="fas fa-align-center"></i></button>
            <button class="btn-control" type="submit" onclick="alignText('end')"><i class="fas fa-align-right"></i></button>
            <button class="btn-control" type="submit" onclick="alignText('top')">&#8793</button>
            <button class="btn-control" type="submit" onclick="alignText('bottom')">&#8794</button>
            </div>
            <div class="line-control">
            <button class="btn-control" type="submit" onclick="moveText('down')"><i class="fas fa-angle-double-down"></i></button>
            <button class="btn-control" type="submit" onclick="moveText('up')"><i class="fas fa-angle-double-up"></i></button>
            <button  class="btn-control" type="submit" onclick="moveText('right')"><i class="fas fa-angle-double-left"></i></button>
            <button class="btn-control" type="submit" onclick="moveText('left')"><i class="fas fa-angle-double-right"></i></button>
            
            </div>
            
                <button class="btn-control" type="submit" onclick="alignText('top')">&#8793</button>
                <button class="btn-control" type="submit" onclick="alignText('bottom')">&#8794</button>


                <div  class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-font"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <div class="dropdown-item"  onclick = changeFont('eurof')>eurof</div>
                    <div class="dropdown-item"  onclick = changeFont('lato')>lato</div>
                    <div class="dropdown-item"  onclick = changeFont('Impact')>Impact</div>
                    <div class="dropdown-item"  onclick = changeFont('Indie_Flower')>Indie_Flower</div>
                    <div class="dropdown-item"  onclick = changeFont('Quicksand')>Quicksand</div>
                    <div class="dropdown-item"  onclick = changeFont('Oswald')>Oswald</a>
                    <div class="dropdown-item"  onclick = changeFont('san-serif')>san-serif</div>
                </div>
                </div>
            </div>

              


                <button class="btn-control" type="submit" onclick="sddShadow()">shadow</button>
                <input class= 'color-btn' type="color" name="favcolor" value="#ff0000" onchange="colorChange(this.value)">
                
                <button class="btn-control" type="submit" onclick="deleteMeme()">delete</button>  
                
                <div class="line-control">

                </div>
                
              </div>
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

function renderTxt() {
    var txtFromUser = GetTxtFromUser();
    if (!gMeme.txts.length) {
        createMeme();
    }
    gMeme.txts[gChosenText].line = txtFromUser;

    for (var i = 0; i < gMeme.txts.length; i++) {
        var currText = gMeme.txts[i];
        var txtCanvas = currText.line;
        var y = currText.y;
        var x = currText.x;
        var fontSize = currText.size;
        var color = currText.color;
        var ctx = gCanvas.getContext("2d");
        var fontFamily = currText.font;
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = currText.align;
        if (!currText.shadow) {
            ctx.shadowOffsetY = 0;
            ctx.shadowOffsetX = 0;
        } else {
            ctx.shadowOffsetY = 3;
            ctx.shadowOffsetX = 3;
        }
        ctx.shadowColor = "grey";
        ctx.fillText(txtCanvas, x, y);
    }
    console.log(gMeme);

}


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}


function addTxtLine() {
    if (gMeme.txts[gChosenText].line !== '') {
        gChosenText++;
        createMeme();
    }
    document.querySelector('.txt-user').value = '';
}


function changeFontSize(direction) {
    var currText = gMeme.txts[gChosenText];
    direction === 'increase' ? currText.size++ : currText.size--;
    renderTxt();
}

function alignText(direction) {
    var currText = gMeme.txts[gChosenText];
    if (direction === 'start' || direction === 'end' || direction === 'center') {
        currText.align = direction;
        if (direction === 'center') currText.x = 150;
        if (direction === 'start') currText.x = 0;
        if (direction === 'end') currText.x = currText.x = gCanvas.width;
    } else {
        currText.y = (direction === 'bottom') ? gCanvas.height * 0.9 : gCanvas.height * 0.1;
    }
    renderTxt();
}

function moveText(direction) {
    var currText = gMeme.txts[gChosenText];
    if (direction === 'right' || direction === 'left') {
        currText.x = (direction === 'right') ? currText.x - 5 : currText.x + 5;
    } else {
        currText.y = (direction === 'down') ? currText.y + 5 : currText.y - 5;
    }
    renderTxt();
}

function changeFont(font) {
    gMeme.txts[gChosenText].font = font;
    var elFonts = document.querySelector('.dropdown-content');
    elFonts.style.display = 'none';
    renderTxt();
}

function sddShadow() {
    if (gMeme.txts[gChosenText].shadow) {
        gMeme.txts[gChosenText].shadow = false;
    } else {
        gMeme.txts[gChosenText].shadow = true;
    }
    renderTxt();
}

function getPosition(click) {
    var rect = gCanvas.getBoundingClientRect();
    var x = click.clientX - rect.left;
    var y = click.clientY - rect.top;
    var chosenText = getTextIdx(x, y);
    if (chosenText === null) return;
    gChosenText = chosenText;
    document.querySelector('.txt-user').value = gMeme.txts[gChosenText].line;

}

function colorChange(val) {
    gMeme.txts[gChosenText].color = val;
    renderTxt();
}

function deleteMeme() {
    gMeme.txts.splice(gChosenText, 1);
    if (gChosenText) {
        gChosenText--;
        var prevMeme = gMeme.txts[gChosenText];
        document.querySelector('.txt-user').value = prevMeme.line;
        renderTxt();
    } else if (gMeme.txts.length > 0) {
        var nextMeme = gMeme.txts[gChosenText];
        document.querySelector('.txt-user').value = nextMeme.line;
        renderTxt();
    } else {
        document.querySelector('.txt-user').value = '';
        renderImg();
    }
}

function markLine(x, y, currTextWidth, height) {
    var ctx = gCanvas.getContext("2d");
    ctx.rect(x, y, currTextWidth, height);
    ctx.fillStyle = 'rgba(240, 255, 255,0.377)';
    ctx.fill();
}



function openGallery() {

    document.querySelector('.cont-gallery').style.display = "block";
    document.querySelector('.cont-editor').style.display = "none";

    // document.querySelector('.cont-editor').href = "#galleryI";

}


function openEditorDom() {
    document.querySelector('.cont-gallery').style.display = "none";
    document.querySelector('.cont-editor').style.display = "block";
    // document.querySelector('body').href = "#edit"; 
    // location.href='link.html  
}












































