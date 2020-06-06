let firstGet = false;
let myKey = '3b4ebde1';
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
let titleTime = undefined;
let titleDegrees = undefined;
let cityName = undefined;
const conditions = [
    'Tempestade forte',
    'Tempestade tropical',
    'Furacão',
    'Tempestades severas',
    'Tempestades',
    'Misto de neve e chuva',
    'Misto chuva e gelo',
    'Misto neve e gelo',
    'Geada fina',
    'Chuviscos',
    'Congelamento chuva',
    'Alguns chuviscos',
    'Alguns chuviscos',
    'Neve baixa',
    'Tempestade com neve',
    'Ventania com neve',
    'Neve',
    'Granizo',
    'Gelo',
    'Poeira',
    'Neblina',
    'Tempestade de areia',
    'Fumacento',
    'Vento acentuado',
    'Ventania',
    'Tempo frio',
    'Tempo nublado',
    'Tempo limpo',
    'Tempo nublado',
    'Parcialmente nublado',
    'Parcialmente nublado',
    'Tempo limpo',
    'Ensolarado',
    'Estrelado',
    'Ensolarado com muitas nuvens',
    'Misto chuva e granizo',
    'Ar quente',
    'Tempestades isoladas',
    'Trovoadas dispersas',
    'Trovoadas dispersas',
    'Chuvas esparsas',
    'Pesados neve',
    'Chuviscos com neve',
    'Neve pesada',
    'Sol com poucas nuvens',
    'Chuva',
    'Queda de neve',
    'Tempestades isoladas',
    'Serviço não disponível'
];
const conditionsSlug = [
    'Tempestade',
    'Neve',
    'Granizo',
    'Chuva',
    'Neblina',
    'Dia limpo',
    'Noite limpa',
    'Nublado',
    'Nublado de dia',
    'Nublado de noite',
    'Dia',
    'Noite'
];

$(document).ready(function () {
    pageLoader = $('.page-loader');
    loader = $('.loader');
    errorMessage = $('.error.message');
    solutionFooter = $('.solution-footer');
    header = $('.header');
    main = $('.main');
    titleTime = $('.title-time');
    titleDegrees = $('.title-degrees');
    cityName = $('.city-name');

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
        createError("A geolocalização não é suportada nesse navegador.", "<strong>Solução:</strong> atualize ou troque de navegador.");
    };
};

const getPosition = function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    let configRequest = { key: myKey, lat: lat, log: lon, user_ip: userIP, locale: 'pt', format: 'json-cors' };

    $.get('https://api.hgbrasil.com/weather', configRequest)
        .done(function(data){
            info = data;

            putCurrentTime();
            putText(loader, 'Exibindo informações');
            elemFocus(loader);
            showInfo(info);

            setInterval(function(){
                getPosition({ coords: { latitude: lat, longitude: lon } })
            }, 60000);
        }).fail(function(error){
            createError("Ocorreu uma falha ao obter a sua localização.", "<strong>Solução:</strong> recarregue a página.");
        });
};

const createError = function(error, solutionError){
    let solution = solutionError ? solutionError : '';

    if(error.code){
        switch(error.code){
            case error.PERMISSION_DENIED:
                errors.push("Você rejeitou a permissão de geolocalização.");
                solution = "<strong>Solução:</strong> recarregue a página.";
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
    }, timeout || 2000)
};