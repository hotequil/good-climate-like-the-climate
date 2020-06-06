$(document).ready(function () {
    let menuClimate = $('.menu-climate');
    let menuTime = $('.menu-time');
    let main = $('.main');

    main.css('height', `calc(100% - ${(menuClimate.outerHeight() + menuTime.outerHeight()) + 'px'})`);
    main.css('top', `${menuTime.outerHeight() + 'px'}`);
});
