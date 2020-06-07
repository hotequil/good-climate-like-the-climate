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

const clickCityName = function(){
    let accordion = $('.content-time .ui.accordion');

    cityName.click(function(evt){
        setTimeout(function(){
            if(accordion.find('.content').hasClass('active')){
                elemFocus(titleTime);
            };
        }, 500);
    });
};