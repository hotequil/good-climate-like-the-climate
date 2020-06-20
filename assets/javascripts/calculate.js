$(document).ready(function () {
    calculate();

    $(window).resize(function(){
        calculate();
    });
});

function calculate() {
    let menuClimate = $('.menu-climate');
    let main = $('.main');

    main.css('height', `calc(100% - ${menuClimate.outerHeight() + 'px'})`);

    calculateTable();
};

function calculateTable() {
    let table = $('.unstackable.table');
    let main = $('.main');

    table.css('max-height', `calc(${main.outerHeight() + 'px'} - 2em)`);
};