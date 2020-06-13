const elemFocus = function(elem, timeout){
    setTimeout(() => elem.focus(), timeout || 250);
};