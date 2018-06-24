'use strict'

function init() {
    gKeyWords = loadFromStorage(KEYWORDS);
    renderFilter();
    renderPhotos();
    renderWords();
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
    cleanSearchBox();
}

function openEditor(imgId) {
    createMeme(imgId);
    initEditor();
}

function renderFilter() {
    createKeyWordMap();
    var strHTMLS ='';
    for (var kewWord in gKeyWords) {
        strHTMLS += `<option value = '${kewWord}'>`
    }
    document.querySelector('#browsers').innerHTML = strHTMLS;
    
}

function filterPhotos() {
    var keyWord = document.querySelector('.search-box input').value;
    if (keyWord === '' || keyWord === 'all' || !gKeyWords[keyWord]) return gImgs;
    gKeyWords[keyWord].searched++;
    saveToStorage(KEYWORDS, gKeyWords);
    renderWords();
    return gKeyWords[keyWord].images;
}

function renderWords() {
    var strHTMLS = '';
    for (var word in gKeyWords) {
        var font = checkFont(word);
        strHTMLS += `<li style = font-size:${font}px; onclick="onKeyWord('${word}')">
            ${word}
        </li>`
    }
    document.querySelector('.wordFilter').innerHTML = strHTMLS;
}

function cleanSearchBox() {
    document.querySelector('.search-box input').value = '';
}

function onKeyWord(keyWord) {
    document.querySelector('.search-box input').value = keyWord;
    renderPhotos();
}