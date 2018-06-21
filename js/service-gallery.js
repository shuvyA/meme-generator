'use strict';
var gKeyWords = {};
var KEYWORDS = 'key words map';
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy','smile'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy', 'nature'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dictator'] },
    { id: 4, url: 'img/4.jpg', keywords: ['sweet'] },
    { id: 5, url: 'img/5.jpg', keywords: ['success','sweet'] },
    { id: 6, url: 'img/6.jpg', keywords: ['sweet'] },
    { id: 7, url: 'img/7.jpg', keywords: ['ugly', 'dictator'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy', 'sweet'] },
    { id: 10, url: 'img/10.jpg', keywords: ['sweet'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['saintly'] },
    { id: 13, url: 'img/13.jpg', keywords: ['crazy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['sweet'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] },
    { id: 19, url: 'img/19.jpg', keywords: ['happy'] },
    { id: 20, url: 'img/20.jpg', keywords: ['happy'] },
    { id: 21, url: 'img/21.jpg', keywords: ['happy'] },
    { id: 22, url: 'img/22.jpg', keywords: ['happy'] }
];



function createKeyWordMap() {
    if (gKeyWords) return;
    gImgs.forEach(function(img, idx){
        var currImgKeywords = img.keywords;
        currImgKeywords.forEach(function(keyWord,idx) {
            if (!gKeyWords[keyWord]) {
                gKeyWords[keyWord] = keyWord;
                gKeyWords[keyWord] = {images:[], searched:0};
                gKeyWords[keyWord].images.push(img);
            }else {
                gKeyWords[keyWord].images.push(img);
                }
        });
    }); 
    console.log(gKeyWords);
    
}

function checkFont(word) {
    var searchCount = gKeyWords[word].searched;
    if (!searchCount) return 13;
    switch(true) {
        case (searchCount < 10):
            return 20;
        case (searchCount < 15):
            return 30;
        default:
            return 40;
    }
}

