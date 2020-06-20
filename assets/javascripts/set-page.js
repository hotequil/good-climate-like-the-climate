const choosePage = (page) => {
    let condition = page && currentPage && currentPage == page ? false : true;

    if(condition){
        if(!page){
            pages.forEach(item => {
                if(location.hash.includes(item)){
                    currentPage = item;
                };
            });

            if(!currentPage){
                currentPage = pages[0];
                location.hash = `#${currentPage}`;
            };
        } else{
            currentPage = page;
        };

        unstackableTable.addClass('opacity-none');
        elemsMenu.forEach(item => {
            if(!item.hasClass('week')) item.addClass('opacity-none')
        });
        menuClimate.removeClass('active');

        $('a[href="#' + currentPage + '"]').addClass('active');

        setTimeout(() => {
            elemsMenu.forEach(item => item.addClass('display-none'));

            switch(currentPage){
                case 'hoje':
                    today.removeClass('opacity-none display-none');
                    elemFocus(titleDegrees);
                    break;
                case 'detalhes':
                    elemFocus(currently.find('.title-period'));
                    details.removeClass('opacity-none display-none');
                    break;
                case 'semana':
                    elemFocus(unstackableTable.find('th:first-child'));
                    unstackableTable.removeClass('opacity-none');
                    week.removeClass('opacity-none display-none');
                    break;
                case 'sobre':
                    about.removeClass('opacity-none display-none');
                    break;

            };
        }, 500);

        menuClimate.click(evt => {
            choosePage(evt.target.hash.replace('#', ''));
        });
    };
};

const showViews = () => {
    header.removeClass('display-none');
    main.removeClass('display-none');
    pageLoader.addClass('opacity-none');

    setTimeout(function(){
        pageLoader.addClass('display-none');
    }, 1000);
};

const contentsOnView = data => {
    titleDegrees.text(`${data.results.temp}°`);
    cityName.text(data.results.city);
    maxAndMin.text(`${data.results.forecast[0].min}° e ${data.results.forecast[0].max}°`);
    currently.find('.title-period').text(data.results.currently || "Sem informação");
    sunrise.find('.value').text(moment(data.results.sunrise, "hh:mm A").format("HH:mm") || "Sem informação");
    sunset.find('.value').text(moment(data.results.sunset, "hh:mm A").format("HH:mm") || "Sem informação");
    windSpeedy.find('.value').text(data.results.wind_speedy.replace('.', ',') || "Sem informação");
    humidity.find('.value').text(`${data.results.humidity || 0}%` || "Sem informação");
    conditionSlug.find('.value').text(conditionsSlug[data.results.condition_slug] || "Sem informação");
    conditionCode.find('.value').text(conditions[data.results.condition_code] || data.results.description || "Sem informação");
    createTable(data.results.forecast);
};

const createTable = data => {
    unstackableTable.find('tbody').html('');

    data.forEach((item, index) => {
        if(index <= 7){
            unstackableTable.find('tbody').append(`<tr><td tabindex="0" data-label="Data">${item.date} (${item.weekday}.)</td><td tabindex="0" data-label="Máx.">${item.max}°</td><td tabindex="0" data-label="Mín.">${item.min}°</td><td tabindex="0" data-label="Descrição">${item.description} (${conditionsSlug[item.condition]})</td></tr>`);
        };
    });
};