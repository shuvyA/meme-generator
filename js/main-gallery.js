'use strict'

function init() {
    renderFilter();
    renderPhotos();
    filterByWord();
}

function renderPhotos() {
    var images = filterPhotos();
    var strHTMLS = '';
    images.forEach(function (img, idx) {
        strHTMLS += `
        <div class='img-container flex'><img src="${img.url}" onclick = 'openEditor(${img.id})'></div>
        `
    });
    var imgContainer = document.querySelector('.the-gallery');
    imgContainer.innerHTML = strHTMLS;
}

function openEditor(imgId) {
    gMeme.selectedImgId = imgId;
    initEditor();
}

function renderFilter() {
    createKeyWordMap();
    var filter = document.querySelector('#inputGroupSelect04');
    var strHTMLS =`<option selected>All</option>`;
    for (var kewWord in gKeyWords) {
        strHTMLS += `<option value = '${kewWord}' oninput="renderPhotos()">${kewWord}</option>`
    }
    filter.innerHTML = strHTMLS;
}

function filterPhotos() {
    var keyWord = document.querySelector('.custom-select').value;
    if (keyWord === 'All') return gImgs;
    return gKeyWords[keyWord];
}

function filterByWord() {
    var strHTMLS = '';
    for (var word in gKeyWords) {
        strHTMLS += `<li style="font-size:${gKeyWords[word].length*3 +20}px;">
            ${word}
        </li>`
    }
    console.log(gKeyWords);

    console.log(strHTMLS);
    
    document.querySelector('.wordFilter').innerHTML = strHTMLS;
}