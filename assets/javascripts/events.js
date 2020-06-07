const keydownCityName = function(){
    let accordion = $('.content-time .ui.accordion');

    cityName.keydown(function(evt){
        if(evt.keyCode === 13){
            accordion.accordion('toggle', 0);

            setTimeout(function(){
                if(accordion.find('.content').hasClass('active')){
                    elemFocus(titleTime);
                };
            }, 500);
        };
    });
};

