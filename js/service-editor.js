'use strict';

var gMeme = {
    selectedImgId: '4',
    txts: [
        {
            line: '',
            size: 20,
            align: 'center',
            color: 'red'
        }
    ]
};



function getImgfromSelctId() {
    var res = '';
    var id = gMeme.selectedImgId;

    gImgs.forEach(function (item, idx) {
        if (id === gImgs[idx].id) res = idx;
    });
    return res;
}

