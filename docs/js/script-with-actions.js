'use strict'
const clsmyalertjs = new Classmyalertjs();
// testing
// clsmyalertjs.messaggio("Call method messaggio");
// Funcmyalertjs.showMyAlert("titolo", "messaggio.", "var(--info)", "var(--white)", "var(--warning)", "var(--dark)");

/* Funcmyalertjs.loader_text("messagio di caricamento dati", "var(--warning)", "var(--darkblue)", "var(--darkred)", "./img/loader/loading-buffering.gif");
setTimeout((e) => {
    Funcmyalertjs.loaderTextHide();
}, 2000); */
// testing
// ######################################################### BEGIN CODE ###############################################################
// click button my alert
// var global
var title = document.querySelector('.input-title');
// button success
var btn_show_alert = document.querySelector('.show-my-alert');
btn_show_alert.addEventListener('click', function() {
    if (`${title.value}` != "") {
        Funcmyalertjs.showMyAlert("welcome", `${title.value}`, "var(--info)", "var(--primary)", "var(--white)", "var(--darkblue)"); // ` = alt(sx)+96(numerico)
    } else {
        Funcmyalertjs.showMyAlert("avviso", "non hai compilato il campo testo", "var(--danger)", "var(--warning)", "var(--dark)", "var(--darkblue)")
    }
});
// button info
var btn_loader = document.querySelector('.loader-my-alert');
btn_loader.addEventListener('click', function() {
    Funcmyalertjs.loader();
    setTimeout(
        function() {
            Funcmyalertjs.loaderHide();
        }, 3000);
});
// button primary
var btn_loader_text = document.querySelector('.loader-my-alert-text');


btn_loader_text.addEventListener('click', function() {
    if (`${title.value}` != "") {
        Funcmyalertjs.loaderText(`${title.value}`, "var(--primary)", "var(--darkyellow)",
            "var(--darkorange)", "img/loader/auto-1.gif", "50px", "100", "100");
        setTimeout(
            function() {
                Funcmyalertjs.loaderTextHide();
            }, 3000);
    } else {
        Funcmyalertjs.showMyAlert("avviso", "non hai compilato il campo testo", "var(--danger)", "var(--warning)", "var(--dark)", "var(--darkblue)");
    }
});
// clear input
var img_clear = document.querySelector('.img-clear').addEventListener('click',
    function() {
        title.value = "";
    });