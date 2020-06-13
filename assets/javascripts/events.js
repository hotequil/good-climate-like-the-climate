const keydownCityName = function(){
    $(title, cityName).keydown(function(evt){
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
    $(title, cityName).click(function(evt){
        setTimeout(function(){
            if(accordion.find('.content').hasClass('active')){
                elemFocus(titleTime);
            };
        }, 500);
    });
};

const closeAccordion = () => {
    $(document).click(evt => {
        if(!$(evt.target).hasClass('title-time') && titleTime.hasClass('visible')){
            accordion.accordion('close', 0);
            elemFocus(cityName);
        };
    });
};

const blurAccordion = () => {
    titleTime.blur(function(evt){
        accordion.accordion('close', 0);
    });
};

const dropdownClick = () => {
    $('.title .dropdown.icon').click(function(){
        elemFocus(cityName);
    });
};