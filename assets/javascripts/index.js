"use strict";

var firstGet = false;
var myKey = '3b4ebde1'; //44ee7251

var userIP = undefined;
var lat = undefined;
var lon = undefined;
var x = undefined;
var pageLoader = undefined;
var loader = undefined;
var info = {};
var errors = [];
var errorMessage = undefined;
var solutionFooter = undefined;
var header = undefined;
var main = undefined;
var title = undefined;
var titleTime = undefined;
var titleDegrees = undefined;
var cityName = undefined;
var maxAndMin = undefined;
var accordion = undefined;
var currentPage = undefined;
var today = undefined;
var details = undefined;
var week = undefined;
var about = undefined;
var menuClimate = undefined;
var elemsMenu = [];
var pages = ['hoje', 'detalhes', 'semana', 'sobre'];
var sunrise = undefined;
var sunset = undefined;
var windSpeedy = undefined;
var humidity = undefined;
var description = undefined;
var currently = undefined;
var conditionSlug = undefined;
var conditionCode = undefined;
var unstackableTable = undefined;
var conditions = {
    0: 'Tempestade forte',
    1: 'Tempestade tropical',
    2: 'Furacão',
    3: 'Tempestades severas',
    4: 'Tempestades',
    5: 'Misto de neve e chuva',
    6: 'Misto chuva e gelo',
    7: 'Misto neve e gelo',
    8: 'Geada fina',
    9: 'Chuviscos',
    10: 'Congelamento chuva',
    11: 'Alguns chuviscos',
    12: 'Alguns chuviscos',
    13: 'Neve baixa',
    14: 'Tempestade com neve',
    15: 'Ventania com neve',
    16: 'Neve',
    17: 'Granizo',
    18: 'Gelo',
    19: 'Poeira',
    20: 'Neblina',
    21: 'Tempestade de areia',
    22: 'Fumacento',
    23: 'Vento acentuado',
    24: 'Ventania',
    25: 'Tempo frio',
    26: 'Tempo nublado',
    27: 'Tempo limpo',
    28: 'Tempo nublado',
    29: 'Parcialmente nublado',
    30: 'Parcialmente nublado',
    31: 'Tempo limpo',
    32: 'Ensolarado',
    33: 'Estrelado',
    34: 'Ensolarado com muitas nuvens',
    35: 'Misto chuva e granizo',
    36: 'Ar quente',
    37: 'Tempestades isoladas',
    38: 'Trovoadas dispersas',
    39: 'Trovoadas dispersas',
    40: 'Chuvas esparsas',
    41: 'Pesados neve',
    42: 'Chuviscos com neve',
    43: 'Neve pesada',
    44: 'Sol com poucas nuvens',
    45: 'Chuva',
    46: 'Queda de neve',
    47: 'Tempestades isoladas',
    48: 'Serviço não disponível'
};
var conditionsSlug = {
    storm: 'Tempestade',
    snow: 'Neve',
    hail: 'Granizo',
    rain: 'Chuva',
    fog: 'Neblina',
    clear_day: 'Dia limpo',
    clear_night: 'Noite limpa',
    cloud: 'Nublado',
    cloudly_day: 'Nublado de dia',
    cloudly_night: 'Nublado de noite',
    none_day: 'Dia',
    none_night: 'Noite'
};

function calculate() {
    var menuClimate = $('.menu-climate');
    var main = $('.main');
    main.css('height', "calc(100% - ".concat(menuClimate.outerHeight() + 'px', ")"));
    calculateTable();
}

;

function calculateTable() {
    var table = $('.unstackable.table');
    var main = $('.main');
    table.css('max-height', "calc(".concat(main.outerHeight() + 'px', " - 4em)"));
}

;
$(document).ready(function () {
    pageLoader = $('.page-loader');
    loader = $('.loader');
    errorMessage = $('.error.message');
    solutionFooter = $('.solution-footer');
    header = $('.header');
    main = $('.main');
    title = $('.title');
    titleTime = $('.title-time');
    titleDegrees = $('.title-degrees');
    cityName = $('.city-name');
    maxAndMin = $('.max-and-min');
    accordion = $('.content-time .ui.accordion');
    today = $('.today');
    details = $('.details');
    week = $('.week');
    about = $('.about');
    elemsMenu = [today, details, week, about];
    menuClimate = $('.menu-climate a[href^="#"]');
    sunrise = $('.sunrise');
    sunset = $('.sunset');
    windSpeedy = $('.wind-speedy');
    humidity = $('.humidity');
    description = $('.description');
    currently = $('.period');
    conditionSlug = $('.condition-slug');
    conditionCode = $('.condition-code');
    unstackableTable = $('.unstackable.table');
    pageLoader.removeClass('display-none');
    moment.locale('pt-BR');
    calculate();
    $(window).resize(function () {
        calculate();
    });
    putText(loader, 'Carregando');
    elemFocus(loader);
    getIp();
});

var getIp = function getIp() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?').done(function (data) {
        userIP = data.ip;
        getLocation();
    }).fail(function (error) {
        createError("Ocorreu uma falha ao obter o seu IP.", "<strong>Solução:</strong> recarregue a página.");
    });
};

var getLocation = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, createError);
        putText(loader, 'Esperando permissão do usuário');
        elemFocus(loader);
    } else {
        createError("A geolocalização não é suportada nesse navegador.", "<strong>Solução:</strong> atualize seu navegador ou troque de navegador.");
    }

    ;
};

var getPosition = function getPosition(position, a, b) {
    putText(loader, 'Exibindo informações');
    elemFocus(loader);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    var configRequest = {
        key: myKey,
        lat: lat,
        lon: lon,
        user_ip: userIP,
        locale: 'pt',
        format: 'json-cors'
    };
    $.get('https://api.hgbrasil.com/weather', configRequest).done(function (data) {
        info = data; //{"by":"gps","valid_key":true,"results":{"temp":25,"date":"20/06/2020","time":"12:42","condition_code":"32","description":"Ensolarado","currently":"dia","cid":"","city":"Gaspar, SC","img_id":"32","humidity":65,"wind_speedy":"8 km/h","sunrise":"7:04 am","sunset":"5:31 pm","condition_slug":"clear_day","city_name":"Gaspar","forecast":[{"date":"20/06","weekday":"Sáb","max":26,"min":16,"description":"Ensolarado","condition":"clear_day"},{"date":"21/06","weekday":"Dom","max":27,"min":16,"description":"Ensolarado","condition":"clear_day"},{"date":"22/06","weekday":"Seg","max":25,"min":16,"description":"Ensolarado","condition":"clear_day"},{"date":"23/06","weekday":"Ter","max":24,"min":16,"description":"Parcialmente nublado","condition":"cloudly_day"},{"date":"24/06","weekday":"Qua","max":26,"min":16,"description":"Ensolarado com muitas nuvens","condition":"cloudly_day"},{"date":"25/06","weekday":"Qui","max":24,"min":15,"description":"Alguns chuviscos","condition":"rain"},{"date":"26/06","weekday":"Sex","max":17,"min":12,"description":"Alguns chuviscos","condition":"rain"},{"date":"27/06","weekday":"Sáb","max":15,"min":12,"description":"Alguns chuviscos","condition":"rain"},{"date":"28/06","weekday":"Dom","max":16,"min":11,"description":"Tempo nublado","condition":"cloud"},{"date":"29/06","weekday":"Seg","max":16,"min":11,"description":"Tempo nublado","condition":"cloud"}]},"execution_time":0.1,"from_cache":false};

        putCurrentTime();
        showInfo(info);
        setInterval(function () {
            getPosition({
                coords: {
                    latitude: lat,
                    longitude: lon
                }
            });
        }, 60000);
    }).fail(function (error) {
        createError("Ocorreu uma falha ao obter a sua localização.", "<strong>Solução:</strong> recarregue a página.");
    });
};

var createError = function createError(error, solutionError) {
    var solution = solutionError ? solutionError : '';

    if (error.code) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errors.push("Você rejeitou a permissão de geolocalização.");
                solution = "<strong>Solução:</strong> permita o uso de localização no seu navegador e recarregue a página.";
                break;

            case error.POSITION_UNAVAILABLE:
                errors.push("Ocorreu uma falha ao obter a sua geolocalização.");
                solution = "<strong>Solução:</strong> recarregue a página.";
                break;

            case error.TIMEOUT:
                errors.push("O tempo para obter a permissão de geolocalização expirou.");
                solution = "<strong>Solução:</strong> recarregue a página.";
                break;

            case error.UNKNOWN_ERROR:
                errors.push("Ocorreu uma falha desconhecida.");
                solution = "<strong>Solução:</strong> recarregue a página.";
                break;

            default:
                errors.push("Ocorreu uma falha desconhecida.");
                solution = "<strong>Solução:</strong> recarregue a página.";
        }

        ;
    } else {
        errors.push(error);
    }

    ;
    putErrors(errors, true, false, solution);
    elemFocus(errorMessage.find('.header'));
    errors = [];
};

var showInfo = function showInfo(data, timeout) {
    setTimeout(function () {
        putInfo(data);
    }, timeout || 1000);
};

var keydownCityName = function keydownCityName() {
    $(title, cityName).keydown(function (evt) {
        if (evt.keyCode === 13) {
            accordion.accordion('toggle', 0);
            setTimeout(function () {
                if (accordion.find('.content').hasClass('active')) {
                    elemFocus(titleTime);
                }

                ;
            }, 500);
        }

        ;
    });
};

var clickCityName = function clickCityName() {
    $(title, cityName).click(function (evt) {
        setTimeout(function () {
            if (accordion.find('.content').hasClass('active')) {
                elemFocus(titleTime);
            }

            ;
        }, 500);
    });
};

var closeAccordion = function closeAccordion() {
    $(document).click(function (evt) {
        if (!$(evt.target).hasClass('title-time') && titleTime.hasClass('visible')) {
            accordion.accordion('close', 0);
            elemFocus(cityName);
        }

        ;
    });
};

var blurAccordion = function blurAccordion() {
    titleTime.blur(function (evt) {
        accordion.accordion('close', 0);
    });
};

var dropdownClick = function dropdownClick() {
    $('.title .dropdown.icon').click(function () {
        elemFocus(cityName);
    });
};

var elemFocus = function elemFocus(elem, timeout) {
    setTimeout(function () {
        return elem.focus();
    }, timeout || 250);
};

var putText = function putText(elem, text) {
    elem.text(text);
};

var putErrors = function putErrors(errors, show, hide, solution) {
    errors.forEach(function (item) {
        errorMessage.find('.list').append("<li tabindex=\"0\">".concat(item, "</li>"));
    });
    errors.length > 1 ? errorMessage.find('.header .header-error').text('Tivemos problemas') : errorMessage.find('.header .header-error').text('Tivemos um problema');
    solutionFooter.find('.solution').html(solution);

    if (show) {
        loader.addClass('display-none');
        errorMessage.removeClass('display-none');
        elemFocus(errorMessage.find('.header .header-error'));
    } else {
        errorMessage.addClass('display-none');
        loader.removeClass('display-none');
    }

    ;
};

var putInfo = function putInfo(data) {
    contentsOnView(data);
    showViews();

    if (!firstGet) {
        calculate();
        initAccordions();
        keydownCityName();
        clickCityName();
        closeAccordion();
        blurAccordion();
        dropdownClick();
        choosePage();
        firstGet = true;
    }

    ;
};

var putCurrentTime = function putCurrentTime() {
    setInterval(function () {
        titleTime.text("".concat(moment().format('dddd'), ", dia ").concat(moment().format('LL'), " \xE0s ").concat(moment().format('LTS')));
    }, 500);
};

var initAccordions = function initAccordions() {
    $('.ui.accordion').accordion();
};

var choosePage = function choosePage(page) {
    var condition = page && currentPage && currentPage == page ? false : true;

    if (condition) {
        if (!page) {
            pages.forEach(function (item) {
                if (location.hash.includes(item)) {
                    currentPage = item;
                }

                ;
            });

            if (!currentPage) {
                currentPage = pages[0];
                location.hash = "#".concat(currentPage);
            }

            ;
        } else {
            currentPage = page;
        }

        ;
        unstackableTable.addClass('opacity-none');
        elemsMenu.forEach(function (item) {
            if (!item.hasClass('week')) item.addClass('opacity-none');
        });
        menuClimate.removeClass('active');
        $('a[href="#' + currentPage + '"]').addClass('active');
        setTimeout(function () {
            elemsMenu.forEach(function (item) {
                return item.addClass('display-none');
            });

            switch (currentPage) {
                case 'hoje':
                    today.removeClass('opacity-none display-none');
                    elemFocus(titleDegrees);
                    break;

                case 'detalhes':
                    details.removeClass('opacity-none display-none');
                    elemFocus(currently.find('.title-period'));
                    break;

                case 'semana':
                    week.removeClass('opacity-none display-none');
                    unstackableTable.removeClass('opacity-none');
                    elemFocus(unstackableTable.find('th:first-child'));
                    break;

                case 'sobre':
                    about.removeClass('opacity-none display-none');
                    elemFocus($('.header.link-header'));
                    break;
            }

            ;
        }, 500);
        menuClimate.click(function (evt) {
            choosePage(evt.target.hash.replace('#', ''));
        });
    }

    ;
};

var showViews = function showViews() {
    header.removeClass('display-none');
    main.removeClass('display-none');
    pageLoader.addClass('opacity-none');
    setTimeout(function () {
        pageLoader.addClass('display-none');
    }, 1000);
};

var contentsOnView = function contentsOnView(data) {
    titleDegrees.text("".concat(data.results.temp, "\xB0"));
    cityName.text(data.results.city);
    maxAndMin.text("".concat(data.results.forecast[0].min, "\xB0 e ").concat(data.results.forecast[0].max, "\xB0"));
    currently.find('.title-period').text(data.results.currently || "Sem informação");
    sunrise.find('.value').text(moment(data.results.sunrise, "hh:mm A").format("HH:mm") || "Sem informação");
    sunset.find('.value').text(moment(data.results.sunset, "hh:mm A").format("HH:mm") || "Sem informação");
    windSpeedy.find('.value').text(data.results.wind_speedy.replace('.', ',') || "Sem informação");
    humidity.find('.value').text("".concat(data.results.humidity || 0, "%") || "Sem informação");
    conditionSlug.find('.value').text(conditionsSlug[data.results.condition_slug] || "Sem informação");
    conditionCode.find('.value').text(conditions[data.results.condition_code] || data.results.description || "Sem informação");
    createTable(data.results.forecast);
};

var createTable = function createTable(data) {
    unstackableTable.find('tbody').html('');
    data.forEach(function (item, index) {
        unstackableTable.find('tbody').append("<tr><td tabindex=\"0\" data-label=\"Data\">".concat(item.date, " (").concat(item.weekday, ".)</td><td tabindex=\"0\" data-label=\"M\xEDn.\">").concat(item.min, "\xB0</td><td tabindex=\"0\" data-label=\"M\xE1x.\">").concat(item.max, "\xB0</td><td tabindex=\"0\" data-label=\"Descri\xE7\xE3o\">").concat(item.description, " (").concat(conditionsSlug[item.condition], ")</td></tr>"));
    });
};