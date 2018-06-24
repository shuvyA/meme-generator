'use strict';


var gIdxLine = 0;

var gCanvas = '';

function initEditor() {
    editorRender();
    gCanvas = document.querySelector('#img-canvas');
    renderImg();
}

function editorRender() {

    var strHtml = `
    

        <h1>editor-canvas</h1>


        <div class="container flex space-between flex-wrap">

            <canvas id="img-canvas" onclick = 'getPosition(event)'>
            </canvas>
            <div class="control-box">
                <input class="txt-user${gIdxLine}" type="text" oninput="renderTxt()" placeholder="write your meme">

                <button type="submit" onclick="addTxtLine()">Add-Line</button>
                <button type="submit" onclick="changeFontSize(${gIdxLine}, 'increase')">+</button>
                <button type="submit" onclick="changeFontSize(${gIdxLine}, 'decrease')">-</button>
                <button type="submit" onclick="alignText(${gIdxLine}, 'end')"><i class="fas fa-align-left"></i></button> 
                <button type="submit" onclick="alignText(${gIdxLine}, 'center')"><i class="fas fa-align-center"></i></button>
                <button type="submit" onclick="alignText(${gIdxLine}, 'start')"><i class="fas fa-align-right"></i></button>
                <button type="submit" onclick="moveText(${gIdxLine},'right')"><i class="fas fa-angle-double-left"></i></button>
                <button type="submit" onclick="moveText(${gIdxLine}, 'left')"><i class="fas fa-angle-double-right"></i></button>
                <button type="submit" onclick="moveText(${gIdxLine}, 'down')"><i class="fas fa-angle-double-down"></i></button>
                <button type="submit" onclick="moveText(${gIdxLine}, 'up')"><i class="fas fa-angle-double-up"></i></button>
                <button type="submit" onclick="alignText(${gIdxLine}, 'top')">&#8793</button>
                <button type="submit" onclick="alignText(${gIdxLine}, 'bottom')">&#8794</button>
                <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-font"></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'eurof')>eurof</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'lato')>lato</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'Impact')>Impact</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'Indie_Flower')>Indie_Flower</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'Quicksand')>Quicksand</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'Oswald')>Oswald</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${gIdxLine},'san-serif')>san-serif</a>
                    </div>
                </div>
                <button type="submit" onclick="sddShadow(${gIdxLine})">shadow</button>
                <input type="color" name="favcolor" value="#ff0000" onchange="colorChange(this.value,${gIdxLine})">
                
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


function GetTxtFromUser(idxLine) {
    renderImg();
    // debugger;
    return document.querySelector(`.txt-user${idxLine}`).value;
    
}

// To do fix clean img 
function renderReset() {
    renderImg();
    gMeme.txts = [];
    renderTxt();
    // document.querySelector(`.txt-user${gIdxLine}`).value;
}

function renderTxt(idxLine) {
    if (!idxLine) idxLine = 0;
    var txtFromUser = GetTxtFromUser(idxLine);
    gMeme.txts[idxLine].line = txtFromUser;
    
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
        ctx.shadowOffsetY=currText.shadowY;
        ctx.shadowOffsetX=currText.shadowY;
        ctx.shadowColor="grey";
        ctx.fillText(txtCanvas, x, y);
    }
}




function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}



function addTxtLine() {
    gIdxLine++;
    addMeme();
    var lineHtml = '';
    var prevTxt = '';
    // render inputs-->>
    for (var i = 1; i <= gIdxLine; i++) {
        
        lineHtml += `
        <input class="txt-user${i}" type="text" oninput="renderTxt(${i})"  value ="" placeholder="write your meme">
        <button type="submit" onclick="changeFontSize(${i}, 'increase')">+</button>
        <button type="submit" onclick="changeFontSize(${i}, 'decrease')">-</button>
        <button type="submit" onclick="alignText(${i}, 'end')"><i class="fas fa-align-left"></i></button> 
        <button type="submit" onclick="alignText(${i}, 'center')"><i class="fas fa-align-center"></i></button>
        <button type="submit" onclick="alignText(${i}, 'start')"><i class="fas fa-align-right"></i></button>
        <button type="submit" onclick="moveText(${i},'right')"><i class="fas fa-angle-double-left"></i></button>
        <button type="submit" onclick="moveText(${i}, 'left')"><i class="fas fa-angle-double-right"></i></button>
        <button type="submit" onclick="moveText(${i}, 'down')"><i class="fas fa-angle-double-down"></i></button>
        <button type="submit" onclick="moveText(${i}, 'up')"><i class="fas fa-angle-double-up"></i></button>
        <button type="submit" onclick="alignText(${i}, 'top')">&#8793</button>
        <button type="submit" onclick="alignText(${i}, 'bottom')">&#8794</button>
        <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-font"></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'eurof')>eurof</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'lato')>lato</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'Impact')>Impact</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'Indie_Flower')>Indie_Flower</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'Quicksand')>Quicksand</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'Oswald')>Oswald</a>
                        <a class="dropdown-item" href="#" onclick = changeFont(${i},'san-serif')>san-serif</a>
                    </div>
                </div>
        <button type="submit" onclick="sddShadow(${gIdxLine})">shadow</button>
        <input type="color" name="favcolor" value="#ff0000" onchange="colorChange(this.value,${i})">
        `;
    }
    document.querySelector('.add-line').innerHTML = lineHtml;
    
    // prev value -->
    
    for (var i = 1; i <= gIdxLine; i++) {
        document.querySelector(`.txt-user${i - 1}`).value = gMeme.txts[i - 1].line;
    }
}




function changeFontSize(lineIdx, direction) {
    var currText = gMeme.txts[lineIdx];
    direction === 'increase'? currText.size++ : currText.size--;
    renderTxt();
}

function alignText(lineIdx, direction) {
    var currText = gMeme.txts[lineIdx];
    if (direction === 'start' || direction === 'end' || direction === 'center') {
        currText.align = direction;
        currText.x = 150;
    } else {
        currText.y = (direction === 'bottom')? 250 : 50;
    }
    renderTxt(lineIdx);
}

function moveText(lineIdx,direction) {
    var currText = gMeme.txts[lineIdx];
    if (direction === 'right' || direction === 'left'){
        currText.x = (direction === 'right')? currText.x - 5 : currText.x + 5;
    } else {
        currText.y = (direction === 'down')? currText.y + 5 : currText.y - 5;
    }
    renderTxt();
}

function changeFont(lineIdx, font) {
    gMeme.txts[lineIdx].font = font;
    renderTxt();    
}

function sddShadow(lineIdx) {
    var currText = gMeme.txts[lineIdx];
    if (!currText.shadowY){
        currText.shadowY = 3;
        currText.shadowX= 3;
    } else {
        currText.shadowY = 0;
        currText.shadowX= 0;
    }
    renderTxt();
}

// function getPosition(click) {
//     var rect = gCanvas.getBoundingClientRect();
//     var x = click.clientX - rect.left;
//     var y = click.clientY - rect.top;
//     var idex = getTextIdx(x,y);    
//     console.log(idex);
    
// }



//del line in dom




function renderImg() {
    var currImgIdx = getImgfromSelctId();

    var imgUrl = gImgs[currImgIdx].url;

    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = imgUrl;

    canvas.width = img.width;
    canvas.height = img.height;

    if (img.height > 350) {

        var ratio = canvas.height / 300;
        canvas.height = 300;
        canvas.width = canvas.width / ratio;

    }
    ctx.drawImage(img, 0, 0);
}





function colorChange(val, lineIdx) {

    gMeme.txts[lineIdx].color= val;
    renderTxt();

    // console.log(val);

}

function deleteLine(lineIdx){

console.log('del',lineIdx);
// delete item of array
gMeme.txts.splice(1,lineIdx);
renderTxt();


}

















































