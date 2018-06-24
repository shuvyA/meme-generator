function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


function openNavMobile(x) {
    // debugger;
    var change = document.querySelector('.nav-mobile')
    change.classList.toggle("change");
    // x.classList.toggle("change");
    var menu = document.querySelector('ul.main-menu');
    // console.log('main menu', menu)
    menu.classList.toggle('open');
    var opac = document.querySelector('.toggle-menu-screen')
    opac.classList.toggle('show-div');
}