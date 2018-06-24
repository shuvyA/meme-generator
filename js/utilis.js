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
    var change = document.querySelector('.nav-mobile')
    change.classList.toggle("change");
    var menu = document.querySelector('ul.main-menu');
    menu.classList.toggle('open');
    var opac = document.querySelector('.toggle-menu-screen')
    opac.classList.toggle('show-div');
}


function closeNavMobile() {
    var change = document.querySelector('.nav-mobile')
    change.classList.remove("change");
    
    var menu = document.querySelector('ul.main-menu');
    menu.classList.remove('open');
    var opac = document.querySelector('.toggle-menu-screen')
    opac.classList.remove('show-div');
}