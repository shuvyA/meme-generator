'use strict'


renderPhotos();

function renderPhotos() {
    var strHTMLS = '';
    gImgs.forEach(function (img, idx) {
        strHTMLS += `<li class = "photoContainer flex" onclick = "openEditor(${img.id})">
        <img src="${img.url}">
        </li>`
    });
    var imgContainer = document.querySelector('.the-gallery');
    imgContainer.innerHTML = strHTMLS;
}

function openEditor(imgId) {
    gMeme.selectedImgId = imgId;
    // window.open("editor.html");

    location.href = "editor.html";
    // document.querySelector('.img').action="editor.html";
    // renderImg();

    console.log(gMeme);

}