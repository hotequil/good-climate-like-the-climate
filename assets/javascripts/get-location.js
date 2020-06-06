$(document).ready(function () {
    getIp();
});

let myKey = '3b4ebde1';
let userIP = undefined;
let lat = undefined;
let lon = undefined;
let x = undefined;

function getIp() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
        .done(function(data) {
            userIP = data.ip;
            getLocation();
        }).fail(function(error) {
           //error
        });
};

function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition, showError);
    } else{
        x.innerHTML="Geolocalização não é suportada nesse browser.";
    };
};

function getPosition(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.getJSON(`https://api.hgbrasil.com/weather?key=${myKey}&lat=${lat}&log=${lon}&user_ip=${userIP}`)
        .done(function(data){
            debugger

        }).fail(function(error){
            debugger

            //error
        });
};

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            x.innerHTML = "Usuário rejeitou a solicitação de Geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Localização indisponível.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "O tempo da requisição expirou.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "Algum erro desconhecido aconteceu.";
            break;
        default:
            x.innerHTML = "Algum erro desconhecido aconteceu.";
    };
};

//condition_slug
// storm - tempestade
// snow - neve
// hail - granizo
// rain - chuva
// fog - neblina
// clear_day - dia limpo
// clear_night - noite limpa
// cloud - nublado
// cloudly_day - nublado de dia
// cloudly_night - nublado de noite
// none_day - erro ao obter mas está de dia
// none_night - erro ao obter mas está de noite

//condition
// 0 - Tempestade forte
// 1 - Tempestade tropical
// 2 - Furacão
// 3 - Tempestades severas
// 4 - Tempestades
// 5 - Misto de neve e chuva
// 6 - Misto chuva e gelo
// 7 - Misto neve e gelo
// 8 - Geada fina
// 9 - Chuviscos
// 10 - Congelamento chuva
// 11 - Alguns chuviscos
// 12 - Alguns chuviscos
// 13 - Neve baixa
// 14 - Tempestade com neve
// 15 - Ventania com neve
// 16 - Neve
// 17 - Granizo
// 18 - Gelo
// 19 - Poeira
// 20 - Neblina
// 21 - Tempestade de areia
// 22 - Fumacento
// 23 - Vento acentuado
// 24 - Ventania
// 25 - Tempo frio
// 26 - Tempo nublado
// 27 - Tempo limpo
// 28 - Tempo nublado
// 29 - Parcialmente nublado
// 30 - Parcialmente nublado
// 31 - Tempo limpo
// 32 - Ensolarado
// 33 - Estrelado
// 34 - Ensolarado com muitas nuvens
// 35 - Misto chuva e granizo
// 36 - Ar quente
// 37 - Tempestades isoladas
// 38 - Trovoadas dispersas
// 39 - Trovoadas dispersas
// 40 - Chuvas esparsas
// 41 - Pesados neve
// 42 - Chuviscos com neve
// 43 - Neve pesada
// 44 - Sol com poucas nuvens
// 45 - Chuva
// 46 - Queda de neve
// 47 - Tempestades isoladas
// 48 - Serviço não disponível