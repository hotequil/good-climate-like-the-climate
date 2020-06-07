$(document).ready(function () {
    $(window).resize(calculateMain);
});

function calculateMain() {
    let menuClimate = $('.menu-climate');
    let main = $('.main');

    main.css('height', `calc(100% - ${menuClimate.outerHeight() + 'px'})`);
};