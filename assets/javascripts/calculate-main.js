$(document).ready(function () {
    let menuClimate = $('.menu-climate');
    let main = $('.main');

    main.css('height', `calc(100% - ${menuClimate.outerHeight() + 'px'})`);
});