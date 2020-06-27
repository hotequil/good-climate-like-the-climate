let firstGet = false;
let myKey = '3b4ebde1'; //44ee7251
let userIP = undefined;
let lat = undefined;
let lon = undefined;
let x = undefined;
let pageLoader = undefined;
let loader = undefined;
let info = {};
let errors = [];
let errorMessage = undefined;
let solutionFooter = undefined;
let header = undefined;
let main = undefined;
let title = undefined;
let titleTime = undefined;
let titleDegrees = undefined;
let cityName = undefined;
let maxAndMin = undefined;
let accordion = undefined;
let currentPage = undefined;
let today = undefined;
let details = undefined;
let week = undefined;
let about = undefined;
let menuClimate = undefined;
let elemsMenu = [];
const pages = ['hoje', 'detalhes', 'semana', 'sobre'];
let sunrise = undefined;
let sunset = undefined;
let windSpeedy = undefined;
let humidity = undefined;
let description = undefined;
let currently = undefined;
let conditionSlug = undefined;
let conditionCode = undefined;
let unstackableTable = undefined;
const conditions = {
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
const conditionsSlug = {
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

    putText(loader, 'Carregando');
    elemFocus(loader);
    getIp();
});

const getIp = function() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
        .done(function(data) {
            userIP = data.ip;

            getLocation();
        }).fail(function(error) {
            createError("Ocorreu uma falha ao obter o seu IP.", "<strong>Solução:</strong> recarregue a página.");
        });
};

const getLocation = function(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition, createError);
        
        putText(loader, 'Esperando permissão do usuário');
        elemFocus(loader);
    } else{
        createError("A geolocalização não é suportada nesse navegador.", "<strong>Solução:</strong> atualize seu navegador ou troque de navegador.");
    };
};

const getPosition = function(position, a ,b){
    putText(loader, 'Exibindo informações');
    elemFocus(loader);

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    let configRequest = { key: myKey, lat: lat, lon: lon, user_ip: userIP, locale: 'pt', format: 'json-cors' };

    // $.get('https://api.hgbrasil.com/weather', configRequest)
    //     .done(function(data){
                    //data;
            info = {"by":"gps","valid_key":true,"results":{"temp":25,"date":"20/06/2020","time":"12:42","condition_code":"32","description":"Ensolarado","currently":"dia","cid":"","city":"Gaspar, SC","img_id":"32","humidity":65,"wind_speedy":"8 km/h","sunrise":"7:04 am","sunset":"5:31 pm","condition_slug":"clear_day","city_name":"Gaspar","forecast":[{"date":"20/06","weekday":"Sáb","max":26,"min":16,"description":"Ensolarado","condition":"clear_day"},{"date":"21/06","weekday":"Dom","max":27,"min":16,"description":"Ensolarado","condition":"clear_day"},{"date":"22/06","weekday":"Seg","max":25,"min":16,"description":"Ensolarado","condition":"clear_day"},{"date":"23/06","weekday":"Ter","max":24,"min":16,"description":"Parcialmente nublado","condition":"cloudly_day"},{"date":"24/06","weekday":"Qua","max":26,"min":16,"description":"Ensolarado com muitas nuvens","condition":"cloudly_day"},{"date":"25/06","weekday":"Qui","max":24,"min":15,"description":"Alguns chuviscos","condition":"rain"},{"date":"26/06","weekday":"Sex","max":17,"min":12,"description":"Alguns chuviscos","condition":"rain"},{"date":"27/06","weekday":"Sáb","max":15,"min":12,"description":"Alguns chuviscos","condition":"rain"},{"date":"28/06","weekday":"Dom","max":16,"min":11,"description":"Tempo nublado","condition":"cloud"},{"date":"29/06","weekday":"Seg","max":16,"min":11,"description":"Tempo nublado","condition":"cloud"}]},"execution_time":0.1,"from_cache":false};

            putCurrentTime();
            showInfo(info);

            setInterval(function(){
                getPosition({ coords: { latitude: lat, longitude: lon } })
            }, 60000);
        // }).fail(function(error){
        //     createError("Ocorreu uma falha ao obter a sua localização.", "<strong>Solução:</strong> recarregue a página.");
        // });
};

const createError = function(error, solutionError){
    let solution = solutionError ? solutionError : '';

    if(error.code){
        switch(error.code){
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
        };
    } else{
        errors.push(error);
    };

    putErrors(errors, true, false, solution);
    elemFocus(errorMessage.find('.header'));
    errors = [];
};

const showInfo = function(data, timeout){
    setTimeout(function(){
        putInfo(data);
    }, timeout || 1000)
};