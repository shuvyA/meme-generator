'use strict';

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['happy']},
{id:2, url:'img/2.jpg', keywords: ['sad']},
{id:3, url:'img/3.jpg', keywords: ['happy']},
{id:4, url:'img/4.jpg', keywords: ['happy']},
{id:5, url:'img/5.jpg', keywords: ['happy']}
];
createKeyWordMap();
function createKeyWordMap() {
    var map = {};
    gImgs.forEach(function(img, idx){
        var currImgKeywords = img.keywords;
        map = currImgKeywords.reduce(function(acc, keyWord){
                if (!acc[keyWord]) {
                acc[keyWord] = keyWord;
                acc[keyWord] = [];
                acc[keyWord].push(img);
            } else {
                acc[keyWord].push(img);
            }
            return acc;
        }, {});

    });

    console.log(map);
}