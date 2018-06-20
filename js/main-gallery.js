'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['happy']},
{id:2, url:'img/2.jpg', keywords: ['sad']},
{id:3, url:'img/3.jpg', keywords: ['happy']},
{id:4, url:'img/4.jpg', keywords: ['happy']},
{id:5, url:'img/5.jpg', keywords: ['happy']}
];
renderPhotos();

function renderPhotos() {
    var strHTMLS = '';
    gImgs.forEach(function(img, idx){
        strHTMLS += `<li class = "photoContainer flex">
        <img src="${img.url}">
        </li>`
    });
    var imgContainer = document.querySelector('.the-gallery');
    imgContainer.innerHTML = strHTMLS;
}