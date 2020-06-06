const putText = function(elem, text){
    elem.text(text);
};

const putErrors = function(errors, show, hide, solution){
    errors.forEach(function(item){
        errorMessage.find('.list').append(`<li tabindex="0">${item}</li>`)
    });

    errors.length > 1 ? errorMessage.find('.header .header-error').text('Tivemos problemas') : errorMessage.find('.header .header-error').text('Tivemos um problema');

    solutionFooter.find('.solution').html(solution);


    if(show){
        loader.addClass('display-none');
        errorMessage.removeClass('display-none');

        elemFocus(errorMessage.find('.header .header-error'));
    } else{
        errorMessage.addClass('display-none');
        loader.removeClass('display-none');
    };
};

const putInfo = function(data){
    titleDegrees.text(data.results.temp);
    cityName.text(data.results.city);

    header.removeClass('display-none');
    main.removeClass('display-none');
    pageLoader.addClass('opacity-none');

    setTimeout(function(){
        pageLoader.addClass('display-none');
    }, 1000);

    elemFocus(titleDegrees);
};

const putCurrentTime = function(){
    setInterval(function(){
        titleTime.text(`${moment().format('dddd')}, ${moment().format('LL')} às ${moment().format('LTS')}`);
    }, 500);
};